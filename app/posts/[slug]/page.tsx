import { getAllPosts, getPostBySlug } from "@/lib/posts"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { notFound } from "next/navigation"

type PostPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export function generateStaticParams() {
    const posts = getAllPosts();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const contentWithoutTitle = post.content.replace(/^#\s+.*\n+/, "");

    return (
        <article className="pb-24">
            <div
                className="mx-auto"
                style={{
                    width: "620px",
                    maxWidth: "calc(100vw - 48px)",
                }}
            >
                <div className="mb-1 flex items-center gap-3 text-[16px] font-light text-white/70">
                    <span className="font-medium text-[#6ee7d8]">
                        {post.category}
                    </span>
                    <span>{post.date}</span>
                </div>

                <h1 className="text-[36px] font-semibold leading-tight tracking-[-0.02em] text-white">
                    {post.title}
                </h1>

                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="mt-10 block h-auto max-w-full rounded-2xl opacity-60"
                />

                <div className="mt-10 text-white/70">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => (
                                <h1 className="mt-10 text-[30px] font-semibold leading-tight text-white">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="mt-8 text-[24px] font-semibold leading-tight text-white">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="mt-6 text-[20px] font-semibold leading-tight text-white">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => (
                                <p className="mt-4 break-words text-[16px] font-light leading-8 text-white/70">
                                    {children}
                                </p>
                            ),
                            ul: ({ children }) => (
                                <ul className="mt-4 list-disc space-y-2 pl-6 text-[16px] font-light leading-8 text-white/70">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="mt-4 list-decimal space-y-2 pl-6 text-[16px] font-light leading-8 text-white/70">
                                    {children}
                                </ol>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="mt-6 border-l-4 border-[#6ee7d8] pl-4 text-white/60">
                                    {children}
                                </blockquote>
                            ),
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    className="text-[#6ee7d8] underline underline-offset-4"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {children}
                                </a>
                            ),
                            code: ({ children }) => (
                                <code className="rounded bg-white/10 px-1.5 py-0.5 text-[14px] text-[#6ee7d8]">
                                    {children}
                                </code>
                            ),
                            pre: ({ children }) => (
                                <pre className="mt-6 overflow-x-auto rounded-xl bg-white/10 p-4 text-[14px] leading-7 text-white/80">
                                    {children}
                                </pre>
                            ),
                        }}
                    >
                        {contentWithoutTitle}
                    </ReactMarkdown>
                </div>
            </div>
        </article>
    )
}