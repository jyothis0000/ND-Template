import type { Metadata } from "next";
import { Footer, Header } from "@/components/home2/Chrome";
import { company } from "@/lib/home2/site";

export const metadata: Metadata = { title: "Privacy — National Dispatching" };

// What this website itself does with data. National Dispatching's full policy for its services stays at company.policy.
export default function Privacy() {
  return (
    <>
      <Header />
      <a href="/home2" className="legal-logo" aria-label="National Dispatching — home">
        <img src="/images/home2/logo-dark.svg" alt="National Dispatching" />
      </a>
      <main className="legal" id="top">
        <h1>Privacy</h1>
        <p className="legal-meta">How this website handles your information</p>
        <div className="legal-body">
          <section>
            <h2>No cookies, no tracking</h2>
            <p>
              This site sets no cookies and runs no analytics, advertising or social-media tools. Fonts, images and scripts are
              served from our own server, so your browser does not contact anyone else while you read it. The only thing kept in
              your browser is a note that you closed our privacy message, so we don’t show it again.
            </p>
          </section>
          <section>
            <h2>When you contact us</h2>
            <p>
              If you call central dispatch on {company.phone} or e-mail{" "}
              <a href={`mailto:${company.email}`}>{company.email}</a>, we use your name, contact details and project information
              to answer you, quote and dispatch your order. We never sell personal information.
            </p>
          </section>
          <section>
            <h2>Links to other sites</h2>
            <p>
              Equipment pages, articles and our social channels open on nationaldispatching.com, Instagram, LinkedIn, Facebook and
              YouTube, under their own privacy terms.
            </p>
          </section>
          <section>
            <h2>Our full policy</h2>
            <p>
              The privacy policy for our services, including your rights and how to exercise them, is at{" "}
              <a href={company.policy} target="_blank" rel="noreferrer noopener">
                nationaldispatching.com/privacy-policy
              </a>
              . Questions: <a href={`mailto:${company.email}`}>{company.email}</a>, {company.offices[0].lines.join(", ")}.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
