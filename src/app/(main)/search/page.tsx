import { getAllPosts } from "../../../lib/posts";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const posts = getAllPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>

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
    </div>
  );
}
