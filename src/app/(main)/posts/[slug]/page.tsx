import { getAllPosts, getPostData } from "@/lib/posts";

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <time className="text-sm text-gray-500">{post.date}</time>
      </header>

      <section
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    params: { slug: post.id },
  }));
}
