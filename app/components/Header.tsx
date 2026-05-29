// 헤더
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="ml-7 inline-flex items-center" aria-label="Go to home">
            <Image
              src="/logo2.svg"
              alt="logo"
              width={54}
              height={54}
              priority
            />
          </Link>
        </div>
      </header>

      <div style={{ height: "100px" }} aria-hidden="true" />
    </>
  );
}