# Project: Matoro Blog 운영 기준 (1-Page)

## 1) 목표
- Markdown 기반으로 빠르게 글을 발행하되, 글 품질과 형식을 일관되게 유지한다.

## 2) 이번 범위
- 포함: 작성 가이드, 포스트 템플릿, 발행 체크리스트
- 제외: CMS 도입, 인증/댓글 기능, 대규모 리디자인

## 3) 작성 규칙 (필수)
### Frontmatter
- `title`: 핵심 키워드 포함
- `description`: 1~2문장 요약
- `category`: 정해진 카테고리만 사용
- `date`: `YYYY-MM-DD`
- `thumbnail`: `/images/...`

### 본문 구조
1. 배경/문제
2. 해결 과정
3. 결과 (코드/이미지)
4. 회고 (배운 점)
5. 참고 링크

## 4) 발행 체크리스트 (DoD)
- [ ] Frontmatter 필수값 모두 입력
- [ ] 오탈자/깨진 링크 없음
- [ ] 이미지 정상 표시 + alt 텍스트 작성
- [ ] 코드블록 언어 태그 지정
- [ ] 카테고리 규칙 준수
- [ ] 목록/상세 페이지에서 정상 노출 확인

## 5) 운영 루틴
- 초안 작성 → 체크리스트 검수 → 로컬 확인 → 발행
- 규칙은 "필수/권장"으로 구분해 작성 속도 유지

## 6) 마일스톤
- M1 (1일): 가이드 확정
- M2 (1일): 템플릿 기반 신규 글 1건 발행
- M3 (2~3일): 기존 글 메타데이터/구조 정리

## 7) Folder Structure

```text
my-blog/
├─ app/
│  ├─ components/
│  ├─ posts/
│  │  └─ [slug]/
│  ├─ layout.tsx
│  └─ page.tsx
├─ content/
│  └─ posts/
├─ lib/
│  └─ posts.ts
├─ public/
│  └─ images/
├─ package.json
└─ README.md
```

### 역할 정리
- `app/`: 화면 라우팅/페이지/컴포넌트
- `content/posts/`: 실제 마크다운 포스트 원문
- `lib/posts.ts`: 포스트 읽기/파싱/정렬 로직
- `public/images/`: 썸네일 및 본문 이미지 정적 파일

### 운영 규칙
- 새 글은 `content/posts/{slug}.md`로 생성
- 썸네일은 `public/images/`에 저장 후 frontmatter `thumbnail`에 `/images/...`로 입력
- 카테고리 문자열은 기존 값과 동일하게 유지(오탈자 금지)


## Current Project Status

### Completed
- Markdown Blog
- Category Filter
- Detail Page
- React Markdown
- Responsive Layout
- Vercel Deploy

### In Progress
- UI Redesign (v3)

### Planned
- Featured Post
- Small Card
- Design System

## 8) Architecture

- App Router 기반 구조를 사용한다.
- `app/layout.tsx`가 전역 레이아웃과 메타데이터를 담당하고, `Header`와 `Footer`를 공통으로 감싼다.
- `app/page.tsx`는 글 목록 화면이며, `searchParams.category`를 기준으로 카테고리 필터를 적용한다.
- `app/posts/[slug]/page.tsx`는 상세 화면이며, `generateStaticParams()`로 정적 경로를 만든다.
- 실제 글 데이터는 `content/posts/*.md`에 저장하고, `lib/posts.ts`가 이를 읽어 정렬하고 파싱한다.
- `gray-matter`로 frontmatter와 본문을 분리하고, 정렬 기준은 `date` 내림차순이다.
- 목록과 상세는 분리되어 있지만 같은 데이터 스키마를 공유하므로, 포스트 메타데이터 변경은 두 화면을 함께 검토해야 한다.
- 마크다운 렌더링은 상세 페이지에서 `react-markdown`과 `remark-gfm`으로 처리한다.
- 썸네일과 본문 이미지 같은 정적 자산은 `public/images/`를 사용한다.
- 컴포넌트는 데이터 로직을 직접 가지지 않고, 가능한 한 표현 책임만 맡는다.

## 9) Components

### Layout / Shell
- `Header`: 상단 고정 헤더, 로고 진입점, 레이아웃 상단 여백 보정 역할을 맡는다.
- `Footer`: 외부 링크와 저작권 영역을 제공하는 하단 영역이다.
- `Container`: 공통 폭 제한과 좌우 패딩을 제공하는 래퍼다.

### Content / Navigation
- `CategoryTabs`: 카테고리 필터 UI이며, 활성 상태와 가로 스크롤 가능 탭을 담당한다.
- `Counter`: 현재 노출 중인 게시글 수를 표시한다.
- `PostCard`: 목록 화면의 단일 글 카드이며, 썸네일, 카테고리, 날짜, 요약을 보여준다.

### Detail Rendering
- 상세 페이지는 제목, 메타 정보, 썸네일, 본문 렌더링 순서를 고정된 리듬으로 유지한다.
- 마크다운 요소별 스타일은 상세 페이지의 `ReactMarkdown` 컴포넌트 설정에서 제어한다.
- `h1`은 본문 중복을 피하기 위해 제거하고, 페이지 제목은 frontmatter의 `title`을 사용한다.

### Component Rules
- 새 UI를 만들 때는 먼저 기존 `Container`, `PostCard`, `CategoryTabs` 패턴을 재사용할 수 있는지 검토한다.
- 화면마다 별도 스타일을 늘리기보다, 공통 패턴이 보이면 컴포넌트로 승격한다.
- 표시 전용 컴포넌트는 서버 컴포넌트로 유지하고, 클라이언트 상태가 필요한 경우에만 client component로 분리한다.
- 포스트 데이터 조회는 컴포넌트가 아닌 `lib/posts.ts` 쪽에서 유지한다.

## 10) Design System

- 전체 톤은 다크 테마이며, 배경은 거의 검은색에 가깝고 텍스트는 고대비 화이트 계열을 사용한다.
- 기본 배경색은 `#0D0D0D`, 주요 포인트 컬러는 민트 계열 `#6ee7d8`다.
- 전역 폰트는 SUIT Variable이며, 본문 전체에 일관되게 적용한다.
- 타이포그래피는 헤드라인은 굵고 조밀하게, 본문은 가볍고 넓은 행간으로 읽기 중심을 유지한다.
- 레이아웃은 넓은 여백과 부드러운 모서리, 카드형 분할을 기본으로 한다.
- 카드와 링크는 hover 시 불투명도, 배경, 테두리의 미세한 변화만 준다.
- 그라데이션은 Footer 같은 제한된 영역에서만 포인트로 사용한다.
- 이미지 표시는 과한 장식보다 비율, opacity, border로 안정감을 주는 방식이다.
- 마크다운 본문은 제목, 단락, 목록, 인용, 코드, 링크, 이미지에 대해 별도 스타일 오버라이드를 유지한다.
- 스크롤바 숨김, 고정 헤더, 반응형 그리드처럼 현재 UI의 감각을 만드는 장치는 유지 대상이다.

## 11) Refactoring Rules

- 파일 기반 포스트 구조는 유지한다. 새 글은 반드시 `content/posts/{slug}.md`로 추가한다.
- frontmatter 키는 `title`, `description`, `category`, `date`, `thumbnail`을 유지하고, 누락 없이 작성한다.
- `category` 값은 기존 허용값과 정확히 일치시킨다. 현재 기준은 `전체`, `음악`, `일상`, `개발`이다.
- 썸네일 경로는 `public/images/` 아래 파일을 가리키는 `/images/...` 형식을 사용한다.
- 목록과 상세가 같은 메타데이터를 쓰므로, frontmatter 형식 변경은 `lib/posts.ts`, 목록 카드, 상세 페이지를 함께 수정한다.
- 정렬이나 필터 기준을 바꿀 때는 `getAllPosts()`와 `app/page.tsx`의 동작을 같이 확인한다.
- 마크다운 렌더링 규칙을 바꿀 때는 헤딩, 코드블록, 이미지, 링크, GFM 표기법의 결과를 모두 점검한다.
- 레이아웃 수정을 할 때는 고정 헤더 높이, 상단 여백 보정, Container 폭 기준을 먼저 확인한다.
- 컴포넌트 분리 시에는 데이터 로직과 표현 로직을 섞지 않는다.
- 스타일을 손볼 때는 개별 카드만 예쁘게 만드는 방향보다 목록, 상세, 푸터가 같은 시각 언어를 유지하는지 우선 본다.
- 리팩토링 후에는 목록 페이지, 카테고리 필터, 상세 페이지, 이미지 노출, 마크다운 렌더링을 같이 검증한다.