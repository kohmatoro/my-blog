import Container from "./Container"
import Image from "next/image"

function MailIcon() {
    return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/></svg>
}

function InstagramIcon() {
    return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none"/></svg>
}

function GithubIcon() {
    return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
}

export default function Footer() {
    return (
        <footer id="profile" className="mt-28 sm:mt-40">
            <Container>
                <div className="bg-[#48ad98] px-6 pb-6 pt-6 text-white">
                    <div className="border-b border-white/70 pb-4">
                        <Image
                            src="/logo-footer-v3.svg"
                            alt=""
                            width={976}
                            height={49}
                            sizes="(max-width: 1056px) calc(100vw - 80px), 976px"
                            className="h-auto w-full"
                        />
                    </div>

                    <div className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <ul className="flex items-center gap-4">
                            <li><a href="mailto:kohmatoro@gmail.com" aria-label="이메일" className="block transition-opacity hover:opacity-65"><MailIcon /></a></li>
                            <li><a href="https://www.instagram.com/garden_koh" aria-label="인스타그램" className="block transition-opacity hover:opacity-65"><InstagramIcon /></a></li>
                            <li><a href="https://github.com/kohmatoro" aria-label="깃허브" className="block transition-opacity hover:opacity-65"><GithubIcon /></a></li>
                        </ul>
                        <p className="text-[12px] tracking-wide text-white/90 sm:text-[13px]">
                            ©2026 matoro. All rights reserved
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    )
}
