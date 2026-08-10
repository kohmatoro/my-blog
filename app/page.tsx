import PostCard from "./components/PostCard"
import Container from "./components/Container"
import { getAllPosts } from "@/lib/posts"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category ?? "개발";
  const posts = getAllPosts();
  const filteredPosts = selectedCategory === "전체"
    ? posts
    : posts.filter((post) => post.category === selectedCategory);
  const [featuredPost, ...compactPosts] = filteredPosts;
  const sectionTitle = selectedCategory === "전체" ? "포스트" : selectedCategory;
  const sectionDescription = selectedCategory === "개발"
    ? "개발중인 내용입니다."
    : "생각과 경험을 기록합니다.";

  return (
    <div className="pt-14">
      <Container>
        <div className="px-[13px]">
        <div className="mb-7">
          <div className="flex items-start gap-1">
            <h1 className="text-[24px] font-semibold tracking-[-0.04em] text-white sm:text-[25px]">{sectionTitle}</h1>
            <sup className="mt-1 text-[11px] font-light text-white/45">{filteredPosts.length}</sup>
          </div>
          <p className="mt-1 text-[14px] font-light text-white/30">{sectionDescription}</p>
        </div>

        {!featuredPost ? (
          <div className="flex min-h-[360px] w-full items-center justify-center py-24 text-[16px] font-light text-white/35">
            아직 게시글이 없습니다.
          </div>
        ) : (
          <section className="grid items-start gap-5 md:grid-cols-[2fr_1fr]">
            <PostCard {...featuredPost} variant="featured" />
            <div className="grid gap-4">
              {compactPosts.slice(0, 3).map((post) => (
                <PostCard key={post.slug} {...post} variant="compact" />
              ))}
            </div>
          </section>
        )}
        </div>
      </Container>
    </div>
  )
}
