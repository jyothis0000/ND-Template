// Blog posts scraped from nationaldispatching.com/blog (bodies sanitized, internal links rewritten).
import data from "./data/blog.json";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: string[];
  category: string;
  html: string;
  image: string;
  minutes: number;
};

export const posts = data as Post[];
export const PER_PAGE = 12;
export const pageCount = Math.ceil(posts.length / PER_PAGE);
export const pageOf = (n: number) => posts.slice((n - 1) * PER_PAGE, n * PER_PAGE);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const postCategories = Object.entries(
  posts.reduce<Record<string, number>>((acc, p) => (p.category ? { ...acc, [p.category]: (acc[p.category] ?? 0) + 1 } : acc), {}),
).sort((a, b) => b[1] - a[1]);

export const related = (p: Post) => posts.filter((o) => o.slug !== p.slug && o.category === p.category).slice(0, 3);
