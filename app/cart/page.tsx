import type { Metadata } from "next";
import { CartView } from "@/components/CartPages";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = { title: "Cart | National Dispatching" };

export default function CartPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <section className="bg-chalk py-10 md:py-16">
          <div className="mx-auto max-w-[1280px] px-5 md:px-8">
            <div className="mb-8 text-center">
              <h1 className="text-bedrock">Your cart</h1>
            </div>
            <CartView />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
