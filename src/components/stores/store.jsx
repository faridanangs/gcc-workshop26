"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiAward, FiMapPin, FiTruck, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { products, sellers, sponsors, storeConfig } from "@/data/store";
import { formatRupiah, getRatingStats } from "@/lib/store-utils";
import { BackgroundBeams } from "../ui/background-beams";
import { EncryptedText } from "../ui/encrypted-text";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";

const sponsorMap = Object.fromEntries(sponsors.map((s) => [s.id, s]));
const sellerMap = Object.fromEntries(sellers.map((s) => [s.id, s]));
const categories = ["Semua", ...new Set(products.map((p) => p.category))];

const sorters = {
  popular: (a, b) => b.sold - a.sold,
  rating: (a, b) =>
    getRatingStats(b.reviews).avg - getRatingStats(a.reviews).avg,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
};

// Sama persis dengan animasi di Hero
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.01, ease: [0.22, 1, 0.36, 1] },
  }),
};

// Info singkat di header
const metaItems = [
  {
    icon: FiMapPin,
    label: `Ambil di ${storeConfig.pickupPoint}, gratis ongkir`,
  },
  {
    icon: FiTruck,
    label: `COD / QRIS ${formatRupiah(storeConfig.shippingPerKm)} per km`,
  },
  { icon: FaWhatsapp, label: "Checkout via WhatsApp" },
];

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-4 py-2 font-body text-sm font-semibold transition ${
        active
          ? "border-ink-900 bg-ink-900 text-cream-50"
          : "border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/40"
      }`}
    >
      {children}
    </button>
  );
}

export function Store() {
  const [category, setCategory] = useState("Semua");
  const [sponsorId, setSponsorId] = useState("all");
  const [sort] = useState("popular");
  const [active, setActive] = useState(null); // { product, view }

  const visible = useMemo(
    () =>
      products
        .filter((p) => category === "Semua" || p.category === category)
        .filter((p) => sponsorId === "all" || p.sponsorId === sponsorId)
        .sort(sorters[sort]),
    [category, sponsorId, sort],
  );

  const resetFilters = () => {
    setCategory("Semua");
    setSponsorId("all");
  };

  return (
    <>
      {/* Header */}
      <section
        id="top"
        className="relative overflow-hidden bg-ink-900 pb-14 pt-10 text-cream-50 sm:pt-20 lg:pb-16 lg:pt-10"
      >
        {/* <BackgroundBeams /> */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-clay-500/30 blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 top-40 h-[380px] w-[380px] rounded-full bg-amber-500/20 blur-[110px]" />
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-clay-500/60 to-transparent" />

        <div className="container relative">
          {/* Kembali ke home */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-cream-50/20 bg-cream-50/10 py-2.5 pl-3.5 pr-5 font-body text-sm font-semibold text-cream-50 backdrop-blur transition hover:border-cream-50 hover:bg-cream-50 hover:text-ink-900"
            >
              <FiArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
              Kembali
            </Link>
          </motion.div>

          <div className="mt-8 sm:mt-12">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Workshop{" "}
              <span className="relative inline-block text-clay-500">
                Store
                <svg
                  viewBox="0 0 200 14"
                  className="absolute -bottom-2 left-0 w-full text-amber-500"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 10 Q 50 2 100 8 T 198 6"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.ul
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {metaItems.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-cream-50/10 bg-cream-50/5 px-3.5 py-2 font-body text-[13px] text-cream-100/80 sm:text-sm"
                >
                  <Icon className="shrink-0 text-amber-500" /> {label}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* Katalog */}
      <section id="produk" className="bg-cream-50 py-12 text-ink-900 sm:py-16">
        <div className="container">
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="group"
            aria-label="Filter produk"
          >
            {categories.map((c) => (
              <Chip
                key={c}
                active={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </Chip>
            ))}
            {sponsorId !== "all" && (
              <button
                type="button"
                onClick={() => setSponsorId("all")}
                aria-label={`Hapus filter sponsor ${sponsorMap[sponsorId].name}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-clay-500 bg-clay-500/10 px-4 py-2 font-body text-sm font-semibold"
              >
                <FiAward className="text-clay-500" />
                {sponsorMap[sponsorId].name}
                <FiX />
              </button>
            )}
          </div>

          <p
            className="mt-8 font-body text-sm text-ink-900/60"
            aria-live="polite"
          >
            {visible.length} produk
          </p>

          {visible.length === 0 ? (
            <div className="mt-4 rounded-3xl border border-dashed border-ink-900/20 bg-white/60 px-6 py-16 text-center">
              <p className="font-display text-xl font-bold">
                Produk tidak ditemukan
              </p>
              <p className="mt-1 font-body text-sm text-ink-900/60">
                Coba pilih kategori lain atau hapus filter yang aktif.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-full bg-ink-900 px-5 py-2.5 font-body text-sm font-semibold text-cream-50 transition hover:bg-clay-500"
              >
                Reset filter
              </button>
            </div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {visible.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    sponsor={sponsorMap[p.sponsorId]}
                    onOpen={(product, view) => setActive({ product, view })}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <ProductModal
            key={active.product.id}
            product={active.product}
            sponsor={sponsorMap[active.product.sponsorId]}
            seller={sellerMap[active.product.sellerId]}
            initialView={active.view}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}