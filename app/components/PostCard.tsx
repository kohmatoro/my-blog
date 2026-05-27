// 게시글 카드

import Image from "next/image";

type PostCardProps = {
    title: string;
    description: string;
    category: string;
    // date: string;
    thumbnail: string;
};

export default function PostCard({    
    title,
    description,
    category,
    // date,
    thumbnail,
}: PostCardProps) {
    return (
        <div className="mx-5 my-5">
            {/* <div className="aspect-467/264 bg-neutral-700 rounded-2xl border border-neutral-400 opacity-50"></div> */}
            <Image
                src={thumbnail}
                alt={title}
                width={467}
                height={264}
                className="aspect-467/264 bg-neutral-700 rounded-2xl border border-neutral-400 opacity-50"
            />
            <p className="text-[16px] mt-3">{category}</p>
            <h1 className="text-[24px]">{title}</h1>
            <p className="text-[16px] text-[#BCBCBC]">{description}</p>
        </div>
    )
}


