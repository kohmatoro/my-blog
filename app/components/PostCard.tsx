import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
    slug: string;
    title: string;
    description: string;
    excerpt: string;
    category: string;
    date: string;
    thumbnail: string;
    variant?: "featured" | "compact";
};

function formatDate(date: string) {
    const [year, month, day] = date.split("-");
    return year && month && day ? `${year.slice(2)}.${month}.${day}` : date;
}

export default function PostCard({
    slug,
    title,
    description,
    excerpt,
    date,
    thumbnail,
    variant = "featured",
}: PostCardProps) {
    if (variant === "compact") {
        return (
            <Link href={`/posts/${slug}`} className="group grid min-h-[102px] grid-cols-[102px_1fr] border border-white/30 bg-[#2e2e2e] transition-colors hover:bg-[#373737]">
                <div className="relative min-h-[100px] overflow-hidden border-r border-white/20">
                    <Image
                        src={thumbnail}
                        alt=""
                        fill
                        sizes="102px"
                        className="object-cover opacity-75 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-90"
                    />
                </div>
                <article className="flex min-w-0 flex-col justify-between px-4 py-3">
                    <div className="flex items-center justify-between gap-3 text-[12px]">
                        <span className="min-w-0 truncate text-[#48ad98]" title={description}>{description}</span>
                        <time className="shrink-0 text-white/45" dateTime={date}>{formatDate(date)}</time>
                    </div>
                    <h2 className="mt-3 line-clamp-2 text-[15px] font-semibold leading-[1.45] text-white/90">{title}</h2>
                </article>
            </Link>
        )
    }

    return (
        <Link href={`/posts/${slug}`} className="group block w-full border border-white/30 bg-[#2e2e2e] transition-colors hover:bg-[#373737]">
            <article>
                <Image
                    src={thumbnail}
                    alt=""
                    width={900}
                    height={320}
                    sizes="(max-width: 768px) 100vw, 652px"
                    loading="eager"
                    className="aspect-[2.82/1] w-full border-b border-white/20 object-cover opacity-75 transition duration-300 group-hover:opacity-90"
                />

                <div className="flex min-h-[105px] flex-col px-4 pb-3 pt-3">
                    <div className="flex items-center justify-between gap-3 text-[12px]">
                        <span className="min-w-0 truncate text-[#48ad98]" title={description}>{description}</span>
                        <time className="shrink-0 text-white/45" dateTime={date}>{formatDate(date)}</time>
                    </div>
                    <h2 className="mt-2 line-clamp-2 text-[18px] font-semibold leading-[1.55] text-white/95 sm:text-[19px]">
                        {title}
                    </h2>
                    {excerpt && (
                        <p className="mt-1 line-clamp-1 text-[13px] font-light leading-[1.6] text-white/45 sm:text-[14px]">{excerpt}</p>
                    )}
                </div>
            </article>
        </Link>
    )
}
