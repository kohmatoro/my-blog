import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CategoryNav from "./CategoryNav";

function CategoryNavFallback() {
  return (
    <ul className="flex items-center gap-6 text-[14px] text-white/30 sm:gap-8 sm:text-[13px]">
      <li className="text-white/85">포스트</li>
      <li>개발</li>
      <li>음악</li>
    </ul>
  );
}

export default function Header() {
  return (
    <header className="bg-[#0b0b0b] px-4">
      <div className="mx-auto flex h-12 w-full max-w-[1024px] items-center justify-between border-b border-[#48ad98]">
        <Link href="/" className="inline-flex items-center" aria-label="홈으로 이동">
          <Image
            src="/logo-header-v3.svg"
            alt="Matoro"
            width={94}
            height={14}
            className="h-[14px] w-[94px]"
            priority
          />
        </Link>

        <nav aria-label="주요 메뉴">
          <Suspense fallback={<CategoryNavFallback />}>
            <CategoryNav />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
