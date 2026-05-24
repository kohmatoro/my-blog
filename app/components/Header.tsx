// 헤더
import Image from "next/image"

export default function Header() {
  return (
    <header className="mx-auto w-full max-w-370 px-10 py-8">
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">
          <Image 
          src="/logo.svg"
          alt="logo"
          width={20}
          height={20}
          />
          <h1 className="text-[36px] font-light">
              Blog
          </h1>
        </div>


        <ul className="text-[20px] flex gap-5">
          <li className="text-[#6ee7d8]">전체</li>
          <li>음악</li>
          <li>일상</li>
          <li>개발</li>
        </ul>

      </div>

      <div className="my-5 flex items-center justify-between">
        <p className="text-[16px] font-light opacity-30">
          00개의 게시글
        </p>

        <div className="bg-neutral-700 px-20 py-3 rounded-full border border-neutral-400 opacity-50">

        </div>
      </div>
    </header>
  )
}