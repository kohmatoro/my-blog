---

title: "첫 번째 글"

description: "블로그 첫 글입니다."

category: "개발"

date: "2026-05-27"

thumbnail: "/images/post-1.png"

---



27일 기준 현재까지의 블로그 구조

1. Markdown 파일 작성
2. lib/posts.ts가 Markdown 파일들을 읽음
3. gray-matter로 frontmatter 분리
4. posts 배열 생성
5. page.tsx에서 posts 가져오기
6. URL의 category 값 읽기
7. selectedCategory 만들기
8. filteredPost 만들기
9. visiblePost 만들기
10. visiblePosts.map으로 PostCard 출력