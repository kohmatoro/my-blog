// 하단 정보
import { ArrowUpRight } from "lucide-react"
import Container from "./Container"

export default function Footer() {
    return (
        <footer className="mt-10 text-[16px]">
            <div className="bg-linear-to-r from-[#6ee7d8] to-[#2f6f66]">
                <Container className="py-14">
                    <ul className="font-light text-black">
                        <li>
                            <a href="https://www.instagram.com/garden_koh" className="flex items-center gap-1 hover:opacity-70">
                                instagram
                                <ArrowUpRight size={14} />
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/kohmatoro" className="flex items-center gap-1 hover:opacity-70">
                                github
                                <ArrowUpRight size={14} />
                            </a>
                        </li>
                        <li>
                            <a href="mailto:kohmatoro@gmail.com" className="flex items-center gap-1 hover:opacity-70">
                                email
                                <ArrowUpRight size={14} />
                            </a>
                        </li>
                    </ul>
                </Container>
            </div>

            <div className="bg-white">
                <Container className="py-1 text-right text-black">
                    @2026 matoro All right reserved.
                </Container>
            </div>
        </footer>
    )
}