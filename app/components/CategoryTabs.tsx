import Link from "next/link"

type CategoryTabsProps = {
  selectedCategory: string;
};

const categories = [
  { label: "전체", href: "/" },
  { label: "음악", href: "/?category=음악" },
  { label: "일상", href: "/?category=일상" },
  { label: "개발", href: "/?category=개발" },
];

export default function CategoryTabs({ selectedCategory }: CategoryTabsProps) {
  return (
    <ul className="flex max-w-[calc(100vw-2rem)] shrink-0 gap-4 overflow-x-auto whitespace-nowrap text-[15px] scrollbar-hide sm:gap-5 sm:text-[16px] md:max-w-none md:gap-8 md:text-[20px]">
      {categories.map((category) => {
        const isActive = selectedCategory === category.label;

        return (
          <li key={category.label}>
            <Link
              href={category.href}
              className={
                isActive
                  ? "inline-block border-b-2 border-[#6ee7d8] pb-1 text-[#6ee7d8] transition-colors"
                  : "inline-block text-white/70 transition-colors hover:text-white"
              }
            >
              {category.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}