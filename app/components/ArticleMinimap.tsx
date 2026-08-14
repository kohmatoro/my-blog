"use client";

import type { ArticleHeading } from "@/lib/markdown";
import { useEffect, useState } from "react";

const markerWidths: Record<number, number> = {
    1: 40,
    2: 30,
    3: 22,
    4: 16,
    5: 12,
    6: 8,
};

type ArticleMinimapProps = {
    headings: ArticleHeading[];
};

export default function ArticleMinimap({ headings }: ArticleMinimapProps) {
    const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

    useEffect(() => {
        if (headings.length === 0) return;

        let animationFrame = 0;

        const updateActiveHeading = () => {
            const anchor = Math.min(window.innerHeight * 0.18, 120);
            let nextId = headings[0].id;

            for (const heading of headings) {
                const element = document.getElementById(heading.id);
                if (!element) continue;

                if (element.getBoundingClientRect().top <= anchor) {
                    nextId = heading.id;
                } else {
                    break;
                }
            }

            const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
            setActiveId(reachedBottom ? headings.at(-1)?.id ?? nextId : nextId);
            animationFrame = 0;
        };

        const handleScroll = () => {
            if (animationFrame) return;
            animationFrame = window.requestAnimationFrame(updateActiveHeading);
        };

        updateActiveHeading();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
        };
    }, [headings]);

    if (headings.length === 0) return null;

    const moveToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        element.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
    };

    return (
        <nav
            aria-label="문서 목차"
            className="fixed right-0 top-1/2 z-40 hidden max-h-[72vh] w-14 -translate-y-1/2 overflow-y-auto rounded-l-[28px] border-l border-white/10 bg-[#171717]/92 py-3 pl-3 opacity-80 shadow-[-8px_0_24px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-opacity duration-300 hover:opacity-100 lg:block scrollbar-hide"
        >
            <ol className="flex flex-col gap-[5px]">
                {headings.map((heading) => {
                    const isActive = activeId === heading.id;

                    return (
                        <li key={heading.id} className="h-[7px]">
                            <button
                                type="button"
                                onClick={() => moveToHeading(heading.id)}
                                className="group flex h-full w-full items-center justify-end focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/80"
                                title={heading.text}
                                aria-label={`${heading.text} 섹션으로 이동`}
                                aria-current={isActive ? "location" : undefined}
                            >
                                <span
                                    className={`block h-[3px] origin-right rounded-l-full transition-[background-color,box-shadow,opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
                                        isActive
                                            ? "scale-x-110 bg-white opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.28)]"
                                            : "bg-white/30 opacity-80 group-hover:bg-white/60 group-hover:opacity-100"
                                    }`}
                                    style={{ width: markerWidths[heading.level] ?? markerWidths[6] }}
                                    aria-hidden="true"
                                />
                            </button>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
