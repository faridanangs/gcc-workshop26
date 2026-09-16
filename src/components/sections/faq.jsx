"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqs } from "@/data/workshop";
import { FaPhone, FaPhoneAlt } from "react-icons/fa";
import { EncryptedText } from "../ui/encrypted-text";

export function FAQ() {
  return (
    <section id="faq" className="relative bg-cream-50 py-24 sm:py-28">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="section-heading-eyebrow inline-block rounded-full bg-clay-100 px-4 py-1.5 text-xs font-semibold text-clay-600">
              <EncryptedText
                text={`// pertanyaan-umum`}
                encryptedClassName="text-black"
                revealedClassName="dark:text-clay-600  text-clay-600"
                revealDelayMs={100}
              />
            </span>
            <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
              Masih ada yang mau ditanyakan?
            </h2>
            <p className="mt-4 text-ink-900/90">
              Kalau pertanyaanmu belum terjawab di sini, langsung hubungi
              panitia lewat No WhatsApp dibawah ini:
            </p>
            <span className="flex flex-col gap-2 text-sm mt-2">
              <a
                href="https://wa.me/+6282323042337"
                className="text-black underline flex gap-2 items-center"
              >
                <FaPhoneAlt className="bg-clay-400/40 rounded-full text-lg w-6 h-6 p-1 inline-block" />{" "}
                +6282323042337 (Ismy)
              </a>
              <a
                href="https://wa.me/+6281370383648"
                className="text-black underline  flex gap-2 items-center"
              >
                <FaPhoneAlt className="bg-clay-400/40 rounded-full text-lg w-6 h-6 p-1 inline-block" />{" "}
                +6281370383648 (Zila)
              </a>
            </span>
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
