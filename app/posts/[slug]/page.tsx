import { getAllPosts, getPostBySlug } from "@/lib/posts"

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

                <h1 className="text-[36px] font-light leading-tight tracking-[-0.02em] text-white">
                    {post.title}
                </h1>

                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="mt-10 block h-auto max-w-full rounded-2xl opacity-60"
                />

                <div className="mt-10 whitespace-pre-line break-words text-[16px] font-light leading-8 text-white/70">
                    {post.content}
                </div>
            </div>
        </article>
    )
}