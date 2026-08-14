export type ArticleHeading = {
    id: string;
    level: number;
    text: string;
    line: number;
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

export function extractHeadings(markdown: string): ArticleHeading[] {
    const headings: ArticleHeading[] = [];
    const slugCounts = new Map<string, number>();
    let fenceMarker: "`" | "~" | null = null;

    markdown.split("\n").forEach((line, index) => {
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
        });
    });

    return headings;
}
