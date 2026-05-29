type CounterProps = {
    postCount: number;
}

export default function Counter({ postCount }: CounterProps) {
    return (
        <p className="shrink-0 whitespace-nowrap text-[13px] font-light text-white/40 sm:text-[14px] md:text-[16px]">
            {postCount}개의 게시글
        </p>
    )
}