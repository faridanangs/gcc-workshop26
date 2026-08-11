"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiX,
  FiArrowUpRight,
  FiCalendar,
  FiClock,
  FiMapPin,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { eventInfo } from "@/data/dummy";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#tentang", label: "Tentang" },
  { href: "#rundown", label: "Rundown" },
  { href: "#galeri", label: "Galeri" },
  { href: "#mentor", label: "Mentor" },
  { href: "#sponsor", label: "Sponsor" },
  { href: "#faq", label: "FAQ" },
];

const menuContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.18 },
  },
};

const menuItem = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function MenuIcon({ open }) {
  return (
    <span className="relative block h-4 w-5">
      <motion.span
        className="absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current"
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current"
        animate={open ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current"
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </span>
  );
}

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

  // Tutup drawer dengan tombol Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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
            className={`clay-stamp h-10 w-10 border-2 font-display text-sm font-bold relative ${
              scrolled
                ? "border-clay-500 bg-white text-cream-50"
                : "border-ink-900 bg-white text-cream-50"
            }`}
          >
            <Image src="/images/logo.png" alt="Growth Coding Logo" fill />
          </span>
          <span
            className={`font-display text-sm font-bold leading-tight ${
              scrolled ? "text-cream-50" : "text-cream-100"
            }`}
          >
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

        <motion.button
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors lg:hidden ${
            scrolled
              ? "border-cream-50/15 bg-cream-50/5 text-cream-50"
              : "border-cream-100/20 bg-cream-100/5 text-cream-100"
          }`}
        >
          <MenuIcon open={open} />
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative ml-auto flex h-full w-[86%] max-w-xs flex-col overflow-hidden bg-cream-50"
            >
              {/* Texture & decorative glow — konsisten sama aesthetic Hero */}
              <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.05]" />
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-clay-500/15 blur-[90px]" />

              <div className="relative flex h-full flex-col p-6">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                           <span
            className={`clay-stamp h-10 w-10 border-2 font-display text-sm font-bold relative ${ "border-ink-900 bg-white text-cream-50"}`}
          >
            <Image src="/images/logo.png" alt="Growth Coding Logo" fill />
          </span>
                    <span className="font-display text-sm font-bold leading-tight text-ink-900">
                      {eventInfo.name}
                      <span className="block font-mono text-[10px] font-medium tracking-wide text-ink-900/50">
                        {eventInfo.edition} · {eventInfo.year}
                      </span>
                    </span>
                  </div>
                  <motion.button
                    aria-label="Tutup menu"
                    onClick={() => setOpen(false)}
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/5 text-ink-900"
                  >
                    <FiX className="h-5 w-5" />
                  </motion.button>
                </div>

                <p className="section-heading-eyebrow terminal-caret mb-4 text-[11px] text-clay-500">
                  $ menu --navigasi
                </p>

                {/* Nav links */}
                <motion.nav
                  variants={menuContainer}
                  initial="hidden"
                  animate="show"
                  className="flex flex-1 flex-col"
                >
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link.href}
                      variants={menuItem}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between border-b border-ink-900/10 py-4"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-clay-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-lg font-semibold text-ink-900 transition-colors group-hover:text-clay-500">
                          {link.label}
                        </span>
                      </span>
                      <FiArrowUpRight className="h-4 w-4 -translate-x-1 text-ink-900/30 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-clay-500 group-hover:opacity-100" />
                    </motion.a>
                  ))}
                </motion.nav>

                {/* Info cepat acara */}
                <div className="mb-5 space-y-2 border-t border-dashed border-ink-900/15 pt-5 font-body text-xs text-ink-900/60">
                  <span className="flex items-center gap-2">
                    <FiCalendar className="text-clay-500" /> {eventInfo.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <FiClock className="text-clay-500" /> {eventInfo.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <FiMapPin className="text-clay-500" /> {eventInfo.location}
                  </span>
                </div>

                <Button asChild className="w-full">
                  <a href="#daftar" onClick={() => setOpen(false)}>
                    Daftar sekarang <FiArrowUpRight />
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}