// 4단계: title, description, category, date가 객체로 만들어지는가?

// 5단계: posts 배열로 반환되는가?

// 6단계: app/page.tsx에서 카드로 보이는가?

import path from "path";
import fs from "fs";
import matter from "gray-matter";


const postsDirectory = path.join(process.cwd(), "content", "posts")

export function getAllPosts() {

    const fileNames = fs.readdirSync(postsDirectory);

    const slug = fileNames[0].replace(".md", "")

    const fileName = path.join(postsDirectory, fileNames[0])

    const fileRead = fs.readFileSync(fileName, "utf-8")

    const gray = matter(fileRead)

    const matterData = {
        slug: slug,
        title: gray.data.title,
        description: gray.data.description,
        category: gray.data.category,
        date: gray.data.date,
        thumbnail: gray.data.thumbnail
    }

    return (
        matterData
    )
}