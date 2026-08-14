export type ArticleHeading = {
    id: string;
    level: number;
    text: string;
    line: number;
    preview: string;
};

function toPlainText(value: string) {
    return value
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/[`*_~]/g, "")
        .replace(/\\([\\`*{}\[\]()#+\-.!_>])/g, "$1")
        .trim();
}

function toSlug(value: string, line: number) {
    const slug = value
        .normalize("NFKC")
        .toLocaleLowerCase("ko")
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .trim()
        .replace(/[\s-]+/g, "-");

    return slug || `section-${line}`;
}

function toPreview(lines: string[]) {
    const parts: string[] = [];
    let fenceMarker: "`" | "~" | null = null;

    for (const line of lines) {
        const fence = line.match(/^\s*(`{3,}|~{3,})/);

        if (fence) {
            const marker = fence[1][0] as "`" | "~";
            fenceMarker = fenceMarker === marker ? null : fenceMarker ?? marker;
            continue;
        }

        if (fenceMarker) continue;

        const value = line
            .replace(/^\s*(?:>\s*)+/, "")
            .replace(/^\s*(?:[-+*]|\d+[.)])\s+/, "")
            .trim();

        if (!value) {
            if (parts.length > 0) break;
            continue;
        }

        if (/^#{1,6}[\t ]+/.test(value) || /^([-*_]\s*){3,}$/.test(value)) continue;

        const text = toPlainText(value).replace(/\s+/g, " ");
        if (!text || /^[\p{P}\p{S}\s]+$/u.test(text)) continue;

        parts.push(text);
        if (parts.join(" ").length >= 140) break;
    }

    const preview = parts.join(" ").trim();
    return preview.length > 140 ? `${preview.slice(0, 137).trimEnd()}…` : preview;
}

export function extractHeadings(markdown: string): ArticleHeading[] {
    const headings: ArticleHeading[] = [];
    const slugCounts = new Map<string, number>();
    let fenceMarker: "`" | "~" | null = null;
    const lines = markdown.split("\n");

    lines.forEach((line, index) => {
        const fence = line.match(/^\s*(`{3,}|~{3,})/);

        if (fence) {
            const marker = fence[1][0] as "`" | "~";
            fenceMarker = fenceMarker === marker ? null : fenceMarker ?? marker;
            return;
        }

        if (fenceMarker) return;

        const match = line.match(/^(#{1,6})[\t ]+(.+?)[\t ]*#*[\t ]*$/);
        if (!match) return;

        const text = toPlainText(match[2]);
        if (!text) return;

        const lineNumber = index + 1;
        const baseSlug = toSlug(text, lineNumber);
        const count = (slugCounts.get(baseSlug) ?? 0) + 1;
        slugCounts.set(baseSlug, count);

        headings.push({
            id: count === 1 ? baseSlug : `${baseSlug}-${count}`,
            level: match[1].length,
            text,
            line: lineNumber,
            preview: "",
        });
    });

    return headings.map((heading, index) => {
        const nextHeading = headings.slice(index + 1).find((candidate) => candidate.level <= heading.level);
        const sectionEnd = nextHeading ? nextHeading.line - 1 : lines.length;

        return {
            ...heading,
            preview: toPreview(lines.slice(heading.line, sectionEnd)),
        };
    });
}
