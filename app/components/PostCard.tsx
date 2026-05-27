// 게시글 카드

type PostCardProps = {
    title: string;
    description: string;
    category: string;
    date: string;
};

export default function PostCard({    
    title,
    description,
    category,
    date,
}: PostCardProps) {
    return (
        <div className="mx-5 my-5">
            <div className="aspect-467/264 bg-neutral-700 rounded-2xl border border-neutral-400 opacity-50"></div>
            <p className="text-[16px] mt-3">{category}</p>
            <h1 className="text-[24px]">{title}</h1>
            <p className="text-[16px] text-[#BCBCBC]">{description}</p>
        </div>
    )
}


