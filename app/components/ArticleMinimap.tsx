"use client";

import type { ArticleHeading } from "@/lib/markdown";
import { useEffect, useState } from "react";

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
            className="fixed right-0 top-1/2 z-40 hidden w-12 -translate-y-1/2 py-3 opacity-75 transition-opacity duration-300 hover:opacity-100 lg:block"
        >
            <ol className="flex flex-col gap-1.5">
                {headings.map((heading) => {
                    const isActive = activeId === heading.id;
                    const tooltipId = `heading-preview-${heading.id}`;

                    return (
                        <li key={heading.id} className="h-2.5">
                            <button
                                type="button"
                                onClick={() => moveToHeading(heading.id)}
                                className="group relative flex h-full w-full items-center justify-end focus-visible:outline-none"
                                aria-label={`${heading.text} 섹션으로 이동`}
                                aria-current={isActive ? "location" : undefined}
                                aria-describedby={tooltipId}
                            >
                                <span
                                    className={`block h-[3px] origin-right rounded-l-full transition-[width,background-color,box-shadow,opacity] duration-300 ease-out motion-reduce:transition-none ${
                                        isActive
                                            ? "w-10 bg-white opacity-100 shadow-[0_0_8px_rgba(255,255,255,0.22)]"
                                            : "w-6 bg-white/30 opacity-80 group-hover:w-8 group-hover:bg-white/60 group-hover:opacity-100 group-focus-visible:w-8 group-focus-visible:bg-white"
                                    }`}
                                    aria-hidden="true"
                                />

                                <span
                                    id={tooltipId}
                                    role="tooltip"
                                    className="pointer-events-none absolute right-full top-1/2 mr-4 w-[min(380px,calc(100vw-96px))] -translate-y-1/2 translate-x-2 rounded-[18px] border border-white/10 bg-[#303030] px-4 py-3.5 text-left opacity-0 shadow-[0_12px_36px_rgba(0,0,0,0.28)] transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
                                >
                                    <span className="block text-[15px] font-semibold leading-5 text-white">
                                        {heading.text}
                                    </span>
                                    {heading.preview && (
                                        <span className="mt-2 block max-h-[72px] overflow-hidden text-[14px] font-normal leading-6 text-white/55">
                                            {heading.preview}
                                        </span>
                                    )}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
