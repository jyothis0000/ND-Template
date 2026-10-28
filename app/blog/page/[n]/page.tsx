import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogIndex from "@/components/BlogIndex";
import { pageCount } from "@/lib/blog";

type Props = { params: Promise<{ n: string }> };

export const instant = false;

export function generateStaticParams() {
  return Array.from({ length: pageCount - 1 }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Blog – Page ${(await params).n} | National Dispatching` };
}

export default async function BlogPaged({ params }: Props) {
  const n = Number((await params).n);
  if (!Number.isInteger(n) || n < 2 || n > pageCount) notFound();
  return <BlogIndex page={n} />;
}
