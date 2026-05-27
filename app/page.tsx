import PostCard from "./components/PostCard"
import Container from "./components/Container"
import { getAllPosts } from "@/lib/posts"

export default function Home() {

  const posts = getAllPosts();

  const visiblePosts = posts.slice(0, 6);

  return (
    <div>
      <Container className="flex min-h-[calc(100vh-200px)] flex-col">
        <section className="grid grid-cols-2 gap-x-1">
          {visiblePosts.map((post) => (
              <PostCard
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  category={post.category}
                  date={post.date}
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