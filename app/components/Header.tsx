// 헤더
import Image from "next/image"

export default function Header() {
  return (
    <header className="p-10">
      <div className="flex items-center gap-4">
        <Image 
        src="/logo.svg"
        alt="logo"
        width={30}
        height={30}
        />
        <h1 className="text-4xl font-light">
            Blog
        </h1>
      </div>
    </header>
  )
}