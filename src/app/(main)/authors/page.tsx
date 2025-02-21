import Link from "next/link";
import { getAllAuthors } from "@/lib/posts";

export default function AuthorsPage() {
  const authors = getAllAuthors();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Authors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {authors.map((author) => (
          <Link
            key={author}
            href={`/authors/${encodeURIComponent(author)}`}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {author}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
