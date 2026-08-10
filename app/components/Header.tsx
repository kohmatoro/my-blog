import Image from "next/image";
import Link from "next/link";

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
          <ul className="flex items-center gap-6 text-[12px] text-white/30 sm:gap-8 sm:text-[13px]">
            <li>
              <Link href="/?category=전체" className="transition-colors hover:text-white">포스트</Link>
            </li>
            <li>
              <Link href="/" className="text-white/85 transition-colors hover:text-white">개발</Link>
            </li>
            <li>
              <a href="#profile" className="transition-colors hover:text-white">프로필</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
