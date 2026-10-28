"use client";

import { useState } from "react";
import { contact } from "@/lib/content";
import { btnPrimary } from "./CartDrawer";

// Subjects and response options from the nationaldispatching.com contact form.
const subjects = ["General Question", "Order Support", "Customer Application", "Vendor Onboarding", "Request a Quote", "Product Inquiry", "Portal Access", "Media Inquiry", "Other"];
const input =
  "min-h-11 w-full min-w-0 rounded-lg border px-4 py-2.5 text-sm text-bedrock placeholder:text-clay transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 border-seam focus:border-brand-ink focus:ring-brand";
const label = "font-display text-sm font-semibold text-bedrock";

// ponytail: no form backend here, so the message opens in the visitor's email app addressed to dispatch.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const body = `${f.message}\n\nName: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone || "-"}\nPreferred response: ${f.respond}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  if (sent)
    return (
      <div role="status">
        <p className="font-display text-lg font-bold text-bedrock">Your message is ready to send</p>
        <p className="mt-2 text-shale">Your email app opened with the message to {contact.email}. A team member will respond to you shortly.</p>
        <button type="button" onClick={() => setSent(false)} className="mt-4 font-semibold text-bedrock underline decoration-seam underline-offset-4 hover:text-brand-ink">
          Write another message
        </button>
      </div>
    );
  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor="ct-name" className={label}>Name *</label>
          <input id="ct-name" name="name" required autoComplete="name" className={input} />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor="ct-email" className={label}>Email *</label>
          <input id="ct-email" name="email" type="email" required autoComplete="email" className={input} />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor="ct-phone" className={label}>Phone</label>
          <input id="ct-phone" name="phone" type="tel" autoComplete="tel" className={input} />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor="ct-subject" className={label}>Subject *</label>
          <select id="ct-subject" name="subject" required className={input} defaultValue="Request a Quote">
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <fieldset className="flex flex-wrap gap-x-6 gap-y-2">
        <legend className={`${label} mb-2`}>How can we respond? *</legend>
        {["Email", "Phone", "No Response Needed"].map((o, i) => (
          <label key={o} className="flex items-center gap-2 text-sm text-bedrock">
            <input type="radio" name="respond" value={o} defaultChecked={i === 0} className="accent-bedrock" />
            {o}
          </label>
        ))}
      </fieldset>
      <div className="flex min-w-0 flex-col gap-1.5">
        <label htmlFor="ct-message" className={label}>Message *</label>
        <textarea id="ct-message" name="message" required rows={5} className={input} placeholder="Tell us about your project, equipment or materials" />
      </div>
      <button type="submit" className={`${btnPrimary} h-12 w-full text-base`}>
        Send message
      </button>
      <p className="text-xs text-shale">* All fields marked are required. Opens your email app addressed to {contact.email}.</p>
    </form>
  );
}
