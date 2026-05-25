import Container from "./Container"

export default function SearchBar() {
    return (
        <Container className="my-5">
            <div className="flex items-center justify-between">
                <p className="text-[16px] font-light opacity-30 mx-5">
                    00개의 게시글
                </p>

                <div className="rounded-full border border-neutral-400 bg-neutral-700 px-20 py-3 opacity-50 mx-5" />
            </div>
        </Container>
    )
}