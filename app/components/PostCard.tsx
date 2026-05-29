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
        <Link href={`/posts/${slug}`} className="group -m-2 block w-full rounded-2xl p-2 transition-colors duration-300 hover:bg-white/5">
            <article className="overflow-hidden">
                <Image
                    src={thumbnail}
                    alt={title}
                    width={467}
                    height={264}
                    className="aspect-[467/264] h-auto w-full rounded-xl border border-white/15 bg-neutral-700 object-cover opacity-50 transition duration-300 group-hover:border-white/25 group-hover:opacity-70"
                />

                <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px] text-white/65 md:text-[14px]">
                    <span className="font-semibold text-white/80">{category}</span>
                    <span className="text-[#777777]">{date}</span>
                </div>
                <h2 className="mt-1 text-[22px] font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-[#6ee7d8] md:text-[24px]">{title}</h2>
                <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-white/50 transition-colors duration-300 group-hover:text-white/65 md:text-[15px]">{description}</p>
            </article>
        </Link>
    )
}