// 헤더
"use client";

import Image from "next/image"
import Container from "./Container"
import Link from "next/link"
import { useSearchParams } from "next/navigation";

export default function Header() {

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? "전체";


  const categories = [
    { label: "전체", href: "/" },
    { label: "음악", href: "/?category=음악" },
    { label: "일상", href: "/?category=일상" },
    { label: "개발", href: "/?category=개발" },
  ];

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
            {categories.map((category) => {
              const isActive = selectedCategory === category.label
              return(
                <li key={category.label}>
                  <Link
                    href={category.href}
                    className={
                      isActive
                      ? "text-[#6ee7d8] border-b-2 border-[#6ee7d8]"
                      : "text-white" 
                    }
                  >
                    {category.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </header>
  )
}