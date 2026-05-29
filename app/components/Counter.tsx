type CounterProps = {
    postCount: number;
}

export default function Counter({ postCount }: CounterProps) {
    return (
        <p className="shrink-0 whitespace-nowrap text-[16px] font-light text-white/40">
            {postCount}개의 게시글
        </p>
    )
}