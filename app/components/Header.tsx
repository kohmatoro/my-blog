// 헤더
import Image from "next/image"
import Link from "next/link"
import Container from "./Container"

export default function Header() {
  return (
    <header className="pt-16 pb-12">
      <Container>
        <Link href="/" className="inline-flex items-center gap-4">
          <Image
            src="/logo2.svg"
            alt="logo"
            width={64}
            height={64}
          />

          {/* <span className="text-[36px] font-light leading-none">
            log
          </span> */}
        </Link>
      </Container>
    </header>
  )
}