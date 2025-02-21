import { getPostsByCategory } from "@/lib/posts";
import Link from "next/link";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const posts = getPostsByCategory(params.category);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Posts in Category: {params.category}
      </h1>

      <section className="space-y-8">
        {posts.map(({ id, title, date, excerpt, author }) => (
          <article key={id} className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-2">
              <a href={`/posts/${id}`} className="hover:text-blue-600">
                {title}
              </a>
            </h2>
            <div className="mb-2">
              {author && (
                <Link
                  href={`/authors/${encodeURIComponent(author)}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600"
                >
                  By {author}
                </Link>
              )}
            </div>
            <time className="text-sm text-gray-500">{date}</time>
            <p className="mt-2 text-gray-700">{excerpt}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
