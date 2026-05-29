// 게시글 카드

import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
    slug: string;
    title: string;
    description: string;
    category: string;
    date: string;
    thumbnail: string;
};

export default function PostCard({
    slug,
    title,
    description,
    category,
    date,
    thumbnail,
}: PostCardProps) {
    return (
        <Link href={`/posts/${slug}`} className="block w-116.75 max-w-full">
            <article>
                <Image
                    src={thumbnail}
                    alt={title}
                    width={467}
                    height={264}
                    className="aspect-467/264 rounded-2xl border border-neutral-400 bg-neutral-700 object-cover opacity-50"
                />

                <div className="mt-3 flex items-center gap-2 text-[16px]">
                    <span>{category}</span>
                    <span className="text-[#777777]">{date}</span>
                </div>

                <h2 className="text-[24px]">{title}</h2>
                <p className="text-[16px] text-[#BCBCBC]">{description}</p>
            </article>
        </Link>
    )
}