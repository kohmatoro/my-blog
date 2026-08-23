import PostCard from "./components/PostCard"
import Container from "./components/Container"
import { getAllPosts } from "@/lib/posts"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category === "개발" || params.category === "음악"
    ? params.category
    : "포스트";
  const posts = getAllPosts();
  const filteredPosts = posts.filter((post) => post.category === selectedCategory);
  const [featuredPost, ...compactPosts] = filteredPosts;
  const sectionTitle = selectedCategory;
  const sectionDescription = selectedCategory === "개발"
    ? "개발 관련 내용입니다."
    : selectedCategory === "음악"
      ? "좋아하는 음악과 앨범 후기입니다."
      : "일상의 경험을 기록합니다.";

  return (
    <div className="pt-14">
      <Container>
        <div className="px-[13px]">
          <div className="mb-7">
          <div className="flex items-start gap-1.5">
            <h1 className="text-[24px] font-semibold leading-none tracking-[-0.04em] text-white sm:text-[25px]">{sectionTitle}</h1>
            <span className="text-[12px] font-light leading-none text-white/40">{filteredPosts.length}</span>
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
