import type { Metadata } from "next";
import BlogIndex from "@/components/BlogIndex";

export const metadata: Metadata = {
  title: "Blog | National Dispatching",
  description: "Equipment guides, material ordering tips and procurement know-how from National Dispatching.",
};

export default function BlogPage() {
  return <BlogIndex page={1} />;
}
