import PostCard from "./components/PostCard"
import Container from "./components/Container"
import { getAllPosts } from "@/lib/posts"
import Counter from "./components/Counter"
import CategoryTabs from "./components/CategoryTabs"

export default async function Home({
// searchParams = URL의 ? 뒤에 붙은 값들을 담고 있는 객체임.

  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {

  const params = await searchParams;

  const selectedCategory = params.category ?? "전체";

  const posts = getAllPosts();

  const filteredPosts =
    selectedCategory === "전체"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  // const visiblePosts = filteredPosts.slice(0, 5);

  const visiblePosts = filteredPosts;


  return (
    <div>
      <Container className="mx-auto flex min-h-[calc(100vh-200px)] w-full max-w-[974px] flex-col px-4">
        <div className="mb-10 flex items-center justify-between gap-4 md:mb-14">
          <Counter postCount={filteredPosts.length} />
          <div className="shrink-0">
            <CategoryTabs selectedCategory={selectedCategory} />
          </div>
        </div>

        {visiblePosts.length === 0 ? (
          <div className="flex w-full items-center justify-center py-24 text-[18px] font-light text-white/45">
            아직 게시글이 없습니다.
          </div>
        ) : (
          <section className="grid w-full grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-10 md:gap-y-14">
            {visiblePosts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                category={post.category}
                date={post.date}
                thumbnail={post.thumbnail}
              />
            ))}
          </section>
        )}
      </Container>
    </div>
  )
}