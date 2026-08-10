"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { eventInfo } from "@/data/dummy";

const NAV_LINKS = [
  { href: "#tentang", label: "Tentang" },
  { href: "#rundown", label: "Rundown" },
  { href: "#galeri", label: "Galeri" },
  { href: "#mentor", label: "Mentor" },
  { href: "#sponsor", label: "Sponsor" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`container flex items-center justify-between rounded-2xl px-4 transition-all duration-300 ${
          scrolled
            ? "bg-ink-900/95 py-2.5 shadow-lg backdrop-blur-md"
            : "bg-transparent py-2"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className={`clay-stamp h-10 w-10 border-2 font-display text-sm font-bold ${
              scrolled
                ? "border-clay-500 bg-clay-500 text-cream-50"
                : "border-ink-900 bg-ink-900 text-cream-50"
            }`}
          >
            GC
          </span>
          <span className={`font-display text-sm font-bold leading-tight ${scrolled ? "text-cream-50" : "text-cream-100"}`}>
            {eventInfo.name}
            <span className="block font-mono text-[10px] font-medium tracking-wide opacity-60">
              {eventInfo.edition} · {eventInfo.year}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-clay-500 ${
                scrolled ? "text-cream-100/85" : "text-cream-100"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm">
            <a href="#daftar">
              Daftar sekarang <FiArrowUpRight />
            </a>
          </Button>
        </div>

        <button
          aria-label="Buka menu"
          onClick={() => setOpen(true)}
          className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
            scrolled ? "text-cream-50" : "text-cream-100"
          }`}
        >
          <FiMenu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink-950/60 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto flex h-full w-[82%] max-w-xs flex-col bg-cream-50 p-6"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-sm font-bold text-ink-900">Menu</span>
                <button
                  aria-label="Tutup menu"
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/5 text-ink-900"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-ink-900/10 py-4 font-display text-lg font-semibold text-ink-900"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <Button asChild className="w-full">
                <a href="#daftar" onClick={() => setOpen(false)}>
                  Daftar sekarang <FiArrowUpRight />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
