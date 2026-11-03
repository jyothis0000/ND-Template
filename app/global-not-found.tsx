import type { Metadata } from "next";
import NextLink from "next/link";
import { fontVars } from "./(site)/fonts";
import "./(site)/globals.css";

export const metadata: Metadata = { title: "Page not found | National Dispatching" };

// 404 for URLs that match no route. With two root layouts there is no single layout to render it in,
// so it brings its own <html> in the original site's style.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <main className="flex flex-1 items-center bg-chalk py-24">
          <div className="mx-auto max-w-xl px-5 text-center">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-brand-ink">404</p>
            <h1 className="mt-3 text-bedrock">Page not found</h1>
            <p className="mt-4 text-lg text-shale">That page doesn&apos;t exist or has moved. Try our equipment, or call central dispatch.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <NextLink href="/" className="inline-flex rounded-lg bg-brand px-7 py-3.5 font-display font-bold text-bedrock hover:bg-brand-hover">
                Go to homepage
              </NextLink>
              <NextLink href="/equipment" className="inline-flex rounded-lg border border-seam bg-white px-7 py-3.5 font-display font-bold text-bedrock hover:bg-ite">
                Browse equipment
              </NextLink>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
