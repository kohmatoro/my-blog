// 6단계: app/page.tsx에서 카드로 보이는가?

import path from "path";
import fs from "fs";
import matter from "gray-matter";


const postsDirectory = path.join(process.cwd(), "content", "posts")

export function getAllPosts() {

    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames.map((file) => {
            const slug = file.replace(".md", "")

            const fullPath = path.join(postsDirectory, file)

            const fileRead = fs.readFileSync(fullPath, "utf-8")

            const gray = matter(fileRead)

            const matterData = {
                slug: slug,
                title: gray.data.title,
                description: gray.data.description,
                category: gray.data.category,
                date: gray.data.date,
                thumbnail: gray.data.thumbnail
            };

            return matterData;
    });

    return posts;
}