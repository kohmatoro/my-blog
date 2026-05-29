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
      : posts.filter((post) => post.category === selectedCategory)

  const visiblePosts = filteredPosts.slice(0, 5);

  return (
    <div>
      <Container className="mx-auto flex min-h-[calc(100vh-200px)] max-w-270 flex-col">
        <div className="mx-auto mb-14 grid w-243.5 grid-cols-2 items-center gap-x-10">
          <Counter postCount={posts.length} />
          <div className="justify-self-end">
            <CategoryTabs selectedCategory={selectedCategory} />
          </div>
        </div>

      <section className="mx-auto grid w-243.5 grid-cols-2 gap-x-10 gap-y-14">
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
      </Container>
    </div>
  )
}