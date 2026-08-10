"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { faqs } from "@/data/dummy";

export function FAQ() {
  return (
    <section id="faq" className="relative bg-cream-50 py-24 sm:py-28">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="section-heading-eyebrow inline-block rounded-full bg-clay-100 px-4 py-1.5 text-xs font-semibold text-clay-600">
              // pertanyaan-umum
            </span>
            <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
              Masih ada yang mau ditanyakan?
            </h2>
            <p className="mt-4 text-ink-900/60">
              Kalau pertanyaanmu belum terjawab di sini, langsung hubungi panitia lewat
              WhatsApp atau email di bagian footer.
            </p>
          </div>

          <Accordion type="single" collapsible className="divide-y-0">
            {faqs.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
