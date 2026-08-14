/* eslint-disable @next/next/no-img-element */
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { extractHeadings } from "@/lib/markdown"
import ArticleMinimap from "@/app/components/ArticleMinimap"
import Container from "@/app/components/Container"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type PostPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

function formatDate(date: string) {
    const [year, month, day] = date.split("-");
    return year && month && day ? `${year.slice(2)}.${month}.${day}` : date;
}

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const contentWithoutTitle = post.content.replace(/^#\s+.*\n+/, "");
    const headings = extractHeadings(contentWithoutTitle);
    const headingIdByLine = new Map(headings.map((heading) => [heading.line, heading.id]));

    return (
        <article>
            <ArticleMinimap headings={headings} />

            <Container className="px-0 sm:px-4">
                <div className="relative h-[180px] overflow-hidden sm:aspect-[4/1] sm:h-auto">
                    <Image
                        src={post.thumbnail}
                        alt=""
                        fill
                        priority
                        sizes="(max-width: 1056px) 100vw, 1024px"
                        className="object-cover opacity-80"
                    />
                </div>
            </Container>

            <div className="mx-auto w-full max-w-[678px] px-4 pt-14 sm:pt-17">
                <Link href="/" className="inline-flex items-center gap-2 text-[13px] text-white/30 transition-colors hover:text-white/70">
                    <span className="inline-flex h-5 w-6 items-center justify-center rounded bg-white/35 text-black">
                        <ArrowLeft size={15} strokeWidth={2.5} />
                    </span>
                    이전으로
                </Link>

                <h1 className="mt-10 break-keep text-[25px] font-semibold leading-[1.4] tracking-[-0.025em] text-white sm:text-[27px]">
                    {post.title}
                </h1>

                <div className="mt-7 flex items-center justify-between border-b border-white/75 pb-4 text-[14px]">
                    <span className="text-[#48ad98]">{post.category}</span>
                    <time className="text-white/35" dateTime={post.date}>{formatDate(post.date)}</time>
                </div>

                <div className="pb-4 pt-5 text-white/80">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                                    h1: ({ children, node }) => <h1 id={headingIdByLine.get(node?.position?.start.line ?? -1)} className="mt-12 scroll-mt-24 text-[28px] font-semibold leading-tight text-white">{children}</h1>,
                                    h2: ({ children, node }) => <h2 id={headingIdByLine.get(node?.position?.start.line ?? -1)} className="mt-11 scroll-mt-24 text-[23px] font-semibold leading-tight text-white">{children}</h2>,
                                    h3: ({ children, node }) => <h3 id={headingIdByLine.get(node?.position?.start.line ?? -1)} className="mt-9 scroll-mt-24 text-[20px] font-semibold leading-tight text-white">{children}</h3>,
                                    h4: ({ children, node }) => <h4 id={headingIdByLine.get(node?.position?.start.line ?? -1)} className="mt-8 scroll-mt-24 text-[18px] font-semibold text-white/95">{children}</h4>,
                                    h5: ({ children, node }) => <h5 id={headingIdByLine.get(node?.position?.start.line ?? -1)} className="mt-7 scroll-mt-24 text-[16px] font-semibold text-white/90">{children}</h5>,
                                    h6: ({ children, node }) => <h6 id={headingIdByLine.get(node?.position?.start.line ?? -1)} className="mt-7 scroll-mt-24 text-[14px] font-semibold text-white/80">{children}</h6>,
                            p: ({ children }) => <p className="mt-5 break-words text-[15px] font-light leading-[1.75] text-white/80">{children}</p>,
                            ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-[15px] font-light leading-[1.75] text-white/80">{children}</ul>,
                            ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-[15px] font-light leading-[1.75] text-white/80">{children}</ol>,
                            blockquote: ({ children }) => <blockquote className="mt-7 border-l-2 border-[#48ad98] pl-5 text-white/60">{children}</blockquote>,
                            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                            em: ({ children }) => <em className="italic text-white/85">{children}</em>,
                            del: ({ children }) => <del className="text-white/45 line-through">{children}</del>,
                            hr: () => <hr className="my-12 border-white/20" />,
                            a: ({ href, children }) => <a href={href} className="text-[#62c5b1] underline underline-offset-4" target="_blank" rel="noreferrer">{children}</a>,
                            img: ({ src, alt }) => <img src={src ?? ""} alt={alt ?? ""} className="my-9 block h-auto w-full opacity-90" />,
                            code: ({ children }) => <code className="bg-white/10 px-1.5 py-0.5 text-[14px] text-white/90">{children}</code>,
                            pre: ({ children }) => <pre className="mt-7 overflow-x-auto bg-white/[0.07] p-5 text-[14px] leading-7 text-white/85 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">{children}</pre>,
                            table: ({ children }) => <div className="mt-7 overflow-x-auto"><table className="w-full border-collapse text-left text-[14px]">{children}</table></div>,
                            th: ({ children }) => <th className="border border-white/20 bg-white/10 px-3 py-2 font-semibold">{children}</th>,
                            td: ({ children }) => <td className="border border-white/15 px-3 py-2 text-white/70">{children}</td>,
                        }}
                    >
                        {contentWithoutTitle}
                    </ReactMarkdown>
                </div>
            </div>
        </article>
    )
}
