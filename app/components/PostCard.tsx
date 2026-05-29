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
        <Link href={`/posts/${slug}`} className="block w-full">
            <article>
                <Image
                    src={thumbnail}
                    alt={title}
                    width={467}
                    height={264}
                    className="aspect-[467/264] h-auto w-full rounded-2xl border border-neutral-400 bg-neutral-700 object-cover opacity-50"
                />

                <div className="mt-3 flex flex-wrap items-center gap-2 text-[14px] md:text-[16px]">
                    <span>{category}</span>
                    <span className="text-[#777777]">{date}</span>
                </div>
                <h2 className="mt-1 text-[22px] leading-tight md:text-[24px]">{title}</h2>
                <p className="mt-1 text-[15px] leading-relaxed text-[#BCBCBC] md:text-[16px]">{description}</p>
            </article>
        </Link>
    )
}