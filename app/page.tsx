import PostCard from "./components/PostCard"
import Container from "./components/Container"
import { getAllPosts } from "@/lib/posts"
import SearchBar from "./components/SearchBar"

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

  const visiblePosts = filteredPosts.slice(0, 6);

  return (
    <div>
      <SearchBar postCount={posts.length}/>
      <Container className="flex min-h-[calc(100vh-200px)] flex-col">
        <section className="grid grid-cols-2 gap-x-1">
          {visiblePosts.map((post) => (
              <PostCard
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  category={post.category}
                  // date={post.date}
                  thumbnail={post.thumbnail}
              />
          ))}
        </section>
      </Container>

      <div className="flex justify-center items-center gap-4 px-4 py-4">
        <span>{"<"}</span>

        <span>1</span>
        <span>2</span>
        <span>3</span>

        <span>{">"}</span>
      </div>

    </div>
  )
}