import { getPostsByAuthor } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function AuthorPage({ params }: { params: { author: string } }) {
  const decodedAuthor = decodeURIComponent(params.author);
  const posts = getPostsByAuthor(decodedAuthor);

  if (!posts.length) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Posts by {decodedAuthor}</h1>
      <section className="space-y-8">
        {posts.map(({ id, title, date, excerpt, categories }) => (
          <article key={id} className="border-b pb-6">
            <h2 className="text-2xl font-semibold mb-2">
              <a href={`/posts/${id}`} className="hover:text-blue-600">
                {title}
              </a>
            </h2>
            <div className="flex gap-2 mb-8">
              {categories?.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category}`}
                  className="px-1 py-1 bg-gray-200 rounded text-gray-500"
                >
                  {category}
                </Link>
              ))}
            </div>
            <time className="text-sm text-gray-500">{date}</time>
            <p className="mt-2 text-gray-700">{excerpt}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
