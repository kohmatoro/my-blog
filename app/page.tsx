import PostCard from "./components/PostCard"
import Container from "./components/Container"

export default function Home() {
  return (
    <div>
      <Container className="py-2">
        <div className="grid grid-cols-2 gap-x-1">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
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