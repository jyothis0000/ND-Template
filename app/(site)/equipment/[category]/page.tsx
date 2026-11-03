import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EquipmentListing from "@/components/EquipmentListing";
import { categories } from "@/lib/content";

type Props = { params: Promise<{ category: string }> };

// Every category is prerendered; only unknown slugs (404) would block.
export const instant = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = categories.find((x) => x.slug === category);
  return c ? { title: `${c.title} | National Dispatching`, description: c.intro[0] } : {};
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = categories.find((x) => x.slug === category);
  if (!c) notFound();
  return <EquipmentListing category={c} />;
}
