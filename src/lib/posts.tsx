import fs from "fs";
import path from "path";
import { remark } from "remark";
import matter from "gray-matter";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "src/posts");

export interface Post {
  id: string;
  contentHtml: string;
  title: string;
  date: string;
  excerpt?: string;
  categories?: Array<string>;
  author?: string;
}

export const getAllPosts = (): Omit<Post, "contentHtml">[] => {
  const fileNames = fs.readdirSync(postDirectory);

  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date
        ? matterResult.data.date.toString()
        : "Unknown Date",
      excerpt: matterResult.data.excerpt || "",
      categories: matterResult.data.categories || [],
      author: matterResult.data.author || "",
    };
  });
};

export const getPostData = async (id: string): Promise<Post> => {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date
      ? matterResult.data.date.toString()
      : "Unknown Date",
    excerpt: matterResult.data.excerpt || "",
    categories: matterResult.data.categories || [],
    author: matterResult.data.author || "",
  };
};

export const getPaginatedPosts = (pages: number, limit: number = 5) => {
  const allPosts = getAllPosts();
  const startIndex = (pages - 1) * limit;
  const endIndex = startIndex + limit;
  return {
    posts: allPosts.slice(startIndex, endIndex),
    totalPages: Math.ceil(allPosts.length / limit),
  };
};

export function getAllCategories() {
  const posts = getAllPosts();
  const categories = new Set<string>();
  posts.forEach((post) => {
    if (post.categories) {
      post.categories.forEach((category) => categories.add(category));
    }
  });
  return Array.from(categories);
}

export function getPostsByCategory(category: string) {
  const posts = getAllPosts();
  return posts.filter((post) => post.categories?.includes(category));
}

export function getAllAuthors() {
  const posts = getAllPosts();
  const authors = new Set<string>();
  posts.forEach((post) => {
    if (post.author) {
      authors.add(post.author);
    }
  });
  return Array.from(authors);
}

export function getPostsByAuthor(author: string) {
  const posts = getAllPosts();
  return posts.filter((post) => post.author === author);
}
