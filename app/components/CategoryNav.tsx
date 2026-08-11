"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const baseClassName = "transition-colors hover:text-white";

export default function CategoryNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHome = pathname === "/";
  const categoryParam = searchParams.get("category");
  const selectedCategory = categoryParam === "개발" || categoryParam === "음악"
    ? categoryParam
    : "포스트";

  return (
    <ul className="flex items-center gap-6 text-[12px] text-white/30 sm:gap-8 sm:text-[13px]">
      <li>
        <Link
          href="/"
          className={`${baseClassName} ${isHome && selectedCategory === "포스트" ? "text-white/85" : ""}`}
          aria-current={isHome && selectedCategory === "포스트" ? "page" : undefined}
        >
          포스트
        </Link>
      </li>
      <li>
        <Link
          href="/?category=개발"
          className={`${baseClassName} ${isHome && selectedCategory === "개발" ? "text-white/85" : ""}`}
          aria-current={isHome && selectedCategory === "개발" ? "page" : undefined}
        >
          개발
        </Link>
      </li>
      <li>
        <Link
          href="/?category=음악"
          className={`${baseClassName} ${isHome && selectedCategory === "음악" ? "text-white/85" : ""}`}
          aria-current={isHome && selectedCategory === "음악" ? "page" : undefined}
        >
          음악
        </Link>
      </li>
    </ul>
  );
}
