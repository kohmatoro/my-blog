import path from "path";
import fs from "fs";
import matter from "gray-matter";

// process.cwd는 현재 작업경로를 나타낸다.
// path.join()으로 content/post내에 있는걸 묶어옴.
const postsDirectory = path.join(process.cwd(), "content", "posts")

function cleanInlineMarkdown(value: string) {
    return value
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/[\*_~]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function extractFirstParagraph(markdown: string) {
    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    let inCodeFence = false;
    let paragraph: string[] = [];

    const readParagraph = () => cleanInlineMarkdown(paragraph.join(" "));

    for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index].trim();
        const nextLine = lines[index + 1]?.trim() ?? "";

        if (/^(```|~~~)/.test(line)) {
            inCodeFence = !inCodeFence;
            paragraph = [];
            continue;
        }

        if (inCodeFence) continue;

        if (!line) {
            const result = readParagraph();
            if (result) return result;
            paragraph = [];
            continue;
        }

        const isSetextHeading = /^(=+|-+)$/.test(nextLine);
        const isBlockContent = /^(#{1,6}\s|>\s?|[-+*]\s+|\d+[.)]\s+|!\[[^\]]*\]\([^)]*\)\s*$|\|.*\||-{3,}$|\*{3,}$|_{3,}$|<)/.test(line);

        if (isSetextHeading || isBlockContent) {
            const result = readParagraph();
            if (result) return result;
            paragraph = [];
            continue;
        }

        paragraph.push(line);
    }

    return readParagraph();
}

function getExcerpt(excerpt: unknown, content: string) {
    return typeof excerpt === "string" && excerpt.trim()
        ? excerpt.trim()
        : extractFirstParagraph(content);
}

export function getAllPosts() {

    // postDirectory로 지정된 디렉토리의 파일과 폴더 목록을
    // fs.readdirSync로 동기적으로 읽어옴(작업을 마칠때 까지 프로그램 실행이 대기됨)
    // 디렉토리를 모두 읽은 후에야 다음 코드가 실행.
    const fileNames = fs.readdirSync(postsDirectory);


    // fileNames -> ["1.md", "2.md", "3.md"]
    // map()은 이 배열을 하나씩 돌면서 객체를 생성한다!
    // file은 fileNames 배열에서 하나씩 꺼낸 값 즉 처음엔 "1.md"
    const posts = fileNames.map((file) => {

            // replace의 뜻은 .md를 찾아 ""(공백)으로 바꿔라.
            const slug = file.replace(".md", "")

            // .../content/posts/first-post.md
            const fullPath = path.join(postsDirectory, file)

            // utf-8로 읽기.
            const fileRead = fs.readFileSync(fullPath, "utf-8")

            // front-matter만 가져오기!
            const gray = matter(fileRead)

            const matterData = {
                slug: slug,
                title: gray.data.title,
                description: gray.data.description,
                excerpt: getExcerpt(gray.data.excerpt, gray.content),
                category: gray.data.category,
                date: gray.data.date,
                thumbnail: gray.data.thumbnail
            };

            return matterData;
    });

    return posts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getPostBySlug(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileRead = fs.readFileSync(fullPath, "utf-8");
    const gray = matter(fileRead);

    return {
        slug,
        title: gray.data.title,
        description: gray.data.description,
        excerpt: getExcerpt(gray.data.excerpt, gray.content),
        category: gray.data.category,
        date: gray.data.date,
        thumbnail: gray.data.thumbnail,
        content: gray.content,
    };
}
