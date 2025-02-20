import Search from "@/components/Search";
import { getAllCategories, getAllPosts, getPaginatedPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const { posts, totalPages } = getPaginatedPosts(currentPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const categories = getAllCategories();

  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">My Developer Blog</h1>
        <p className="text-gray-600">Sharing knowledge and experiences</p>
      </header>

      <div className="mb-8">
        <Search />
      </div>

      <div className="flex items-center justify-center gap-4 mb-8">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/categories/${category}`}
            className="px-4 py-2 bg-gray-200 rounded text-gray-500"
          >
            {category}
          </Link>
        ))}
      </div>

      <section className="space-y-8">
        {posts.map(({ id, title, date, excerpt }) => (
          <article key={id} className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-2">
              <a href={`/posts/${id}`} className="hover:text-blue-600">
                {title}
              </a>
            </h2>
            <time className="text-sm text-gray-500">{date}</time>
            <p className="mt-2 text-gray-700">{excerpt}</p>
          </article>
        ))}
      </section>

      <div className="flex justify-center mt-8 gap-4">
        <Link
          href={`/?page=${currentPage - 1}`}
          className={`px-4 py-2 rounded ${
            hasPreviousPage
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-disabled={!hasPreviousPage}
        >
          Previous
        </Link>

        <Link
          href={`/?page=${currentPage + 1}`}
          className={`px-4 py-2 rounded ${
            hasNextPage
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          aria-disabled={!hasNextPage}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
