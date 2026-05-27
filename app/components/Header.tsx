// 헤더
import Image from "next/image"
import Container from "./Container"
import Link from "next/link"

// className="text-[#6ee7d8]"

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
            <li>
                <Link href={"/"}>전체</Link>
            </li>
            <li>
                <Link href={"/?category=음악"}>음악</Link>
            </li>
            <li>
                <Link href={"/?category=일상"}>일상</Link>
            </li>
            <li>
                <Link href={"/?category=개발"}>개발</Link>
            </li>
          </ul>

        </div>
      </Container>
    </header>
  )
}