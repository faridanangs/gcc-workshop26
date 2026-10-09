"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiAward,
  FiMapPin,
  FiTruck,
  FiX,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { products, sellers, sponsors, storeConfig } from "@/data/store";
import { formatRupiah, getRatingStats } from "@/lib/store-utils";
import { BackgroundBeams } from "../ui/background-beams";
import { EncryptedText } from "../ui/encrypted-text";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";
import { SafeImage } from "./shared";

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

// Baris info (gaya sama dengan baris tanggal/jam/lokasi di Hero)
const metaItems = [
  { icon: FiMapPin, label: `Ambil di ${storeConfig.pickupPoint}, gratis ongkir` },
  {
    icon: FiTruck,
    label: `COD / QRIS ${formatRupiah(storeConfig.shippingPerKm)} per km`,
  },
  { icon: FaWhatsapp, label: "Checkout via WhatsApp" },
];

// 3 produk terlaris untuk kartu di sisi kanan header
const featured = [...products].sort(sorters.popular).slice(0, 3);
const cardPos = ["left-0 top-12", "right-0 top-0", "left-24 bottom-0"];
const cardTilt = [-8, 6, -2];

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

  const pickSponsor = (id) => {
    setSponsorId(id);
    setCategory("Semua");
    document
      .getElementById("produk")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Header: gaya sama dengan Hero */}
      <section
        id="top"
        className="relative overflow-hidden bg-ink-900 pb-16 pt-10 text-cream-50 sm:pt-20 lg:pt-24 lg:pb-14"
      >
        <BackgroundBeams />
        <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-clay-500/30 blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 top-40 h-[380px] w-[380px] rounded-full bg-amber-500/20 blur-[110px]" />
        <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.06]" />

        <div className="container relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="section-heading-eyebrow mb-6 inline-flex items-center gap-2.5 rounded-full border border-cream-50/15 bg-cream-50/5 px-4 py-2 text-xs"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
              </span>
              <EncryptedText
                text={`GAMATIKA CODING CLUB`}
                encryptedClassName="text-white"
                revealedClassName="dark:text-white text-amber-400"
                revealDelayMs={100}
              />
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3rem]"
            >
              Workshop Store:
            
            </motion.h1>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-cream-50/10 pt-7 font-body text-sm text-cream-100/70"
            >
              {metaItems.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2">
                  <Icon className="text-clay-500" /> {label}
                </span>
              ))}
            </motion.div>
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

          {/* Daftar sponsor */}
          <div id="sponsor" className="mt-20 scroll-mt-24">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Sponsor yang berjualan
            </h2>
            <p className="mt-2 max-w-xl font-body text-sm text-ink-900/60">
              Setiap sponsor workshop menjual produknya langsung di sini.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sponsors.map((s) => {
                const n = products.filter((p) => p.sponsorId === s.id).length;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => pickSponsor(s.id)}
                      className="flex h-full w-full items-start gap-4 rounded-2xl border border-ink-900/10 bg-white p-5 text-left transition hover:border-clay-500/60"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-clay-500/10 text-clay-500">
                        <FiAward size={22} />
                      </span>
                      <span>
                        <span className="block font-display text-lg font-semibold">
                          {s.name}
                        </span>
                        <span className="mt-0.5 block font-body text-sm text-ink-900/60">
                          {s.tagline}
                        </span>
                        <span className="mt-2 block font-body text-xs font-semibold underline underline-offset-4">
                          Lihat {n} produk
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
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