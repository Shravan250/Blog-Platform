import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">My Developer Blog</h1>
        <p className="text-gray-600">Sharing knowledge and experiences</p>
      </header>
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
