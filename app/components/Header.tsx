// 헤더
import Image from "next/image"
import Container from "./Container"

export default function Header() {
  return (
    <header className="py-8">
      <Container>
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
      </Container>
    </header>
  )
}