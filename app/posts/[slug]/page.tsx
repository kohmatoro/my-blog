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

function resolvePostImageSource(src: string | Blob | undefined, slug: string) {
    if (typeof src !== "string") {
        return "";
    }

    if (src.startsWith("/") || src.startsWith("data:") || /^(?:https?:)?\/\//.test(src)) {
        return src;
    }

    return `/images/posts/${slug}/${src.replace(/^\.\//, "")}`;
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
    const primaryHeadings = headings.filter((heading) => heading.level === 1);
    const headingIdByLine = new Map(headings.map((heading) => [heading.line, heading.id]));

    return (
        <article>
            <ArticleMinimap headings={primaryHeadings} />

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
                    <span className="text-[#48ad98]">
                        {post.category}{post.description ? ` - ${post.description}` : ""}
                    </span>
                    <time className="text-white/35" dateTime={post.date}>{formatDate(post.date)}</time>
                </div>

                <div className="typeset typeset-blog pb-4 pt-5">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children, node }) => <h1 id={headingIdByLine.get(node?.position?.start.line ?? -1)} className="scroll-mt-24">{children}</h1>,
                            h2: ({ children, node }) => <h2 id={headingIdByLine.get(node?.position?.start.line ?? -1)} className="scroll-mt-24">{children}</h2>,
                            h3: ({ children, node }) => <h3 id={headingIdByLine.get(node?.position?.start.line ?? -1)} className="scroll-mt-24">{children}</h3>,
                            h4: ({ children, node }) => <h4 id={headingIdByLine.get(node?.position?.start.line ?? -1)} className="scroll-mt-24">{children}</h4>,
                            h5: ({ children, node }) => <h5 id={headingIdByLine.get(node?.position?.start.line ?? -1)} className="scroll-mt-24">{children}</h5>,
                            h6: ({ children, node }) => <h6 id={headingIdByLine.get(node?.position?.start.line ?? -1)} className="scroll-mt-24">{children}</h6>,
                            a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>,
                            img: ({ src, alt }) => <img src={resolvePostImageSource(src, post.slug)} alt={alt ?? ""} className="mx-auto block max-h-[720px] w-auto border border-white/10 object-contain opacity-90" />,
                            table: ({ children }) => <div className="typeset-scroll"><table>{children}</table></div>,
                        }}
                    >
                        {contentWithoutTitle}
                    </ReactMarkdown>
                </div>
            </div>
        </article>
    )
}
