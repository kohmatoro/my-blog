import PostCard from "./components/PostCard"

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-5 mx-auto w-full max-w-370 px-10">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>

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