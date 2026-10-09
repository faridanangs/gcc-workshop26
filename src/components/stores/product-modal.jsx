"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAward,
  FiCheck,
  FiMapPin,
  FiShoppingBag,
  FiX,
  FiZoomIn,
} from "react-icons/fi";
import { storeConfig } from "@/data/store";
import { CheckoutForm } from "./checkout-form";
import { Lightbox } from "./lightbox";
import { Reviews } from "./reviews";
import { QtyStepper, SafeImage, StarRating, useLockBodyScroll } from "./shared";
import { formatRupiah, getRatingStats } from "../../lib/store-utils";

export function ProductModal({
  product,
  sponsor,
  seller,
  initialView = "detail",
  onClose,
}) {
  const [view, setView] = useState(initialView); // "detail" | "checkout"
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(null); // { images, index } | null

  const scrollRef = useRef(null);
  const closeRef = useRef(null);

  useLockBodyScroll(true);

  const { avg, count } = useMemo(
    () => getRatingStats(product.reviews),
    [product.reviews],
  );

  const gallery = useMemo(() => {
    const list = product.images?.length ? product.images : [""];
    return list.map((src, i) => ({
      src,
      alt: `${product.name} foto ${i + 1}`,
    }));
  }, [product]);

  const soldOut = product.stock <= 0;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  useEffect(() => {
    const onKey = (e) => {
      // Esc saat lightbox terbuka hanya menutup lightbox
      if (e.key === "Escape" && !lightbox) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, onClose]);

  const openLightbox = (images, index) => setLightbox({ images, index });

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink-900/70 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        // dvh: tinggi mengikuti address bar browser HP, jadi tidak ada bagian yang terpotong
        className="relative flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl bg-cream-50 text-ink-900 shadow-2xl sm:max-h-[90dvh] sm:rounded-3xl"
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 48, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-2.5 top-2.5 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-900 shadow transition hover:bg-white sm:right-3 sm:top-3 sm:h-10 sm:w-10"
        >
          <FiX className="text-lg sm:text-xl" />
        </button>

        <div ref={scrollRef} className="overflow-y-auto overscroll-contain">
          <div className="grid gap-4 p-4 pt-12 sm:gap-6 sm:p-6 sm:pt-14 md:grid-cols-[1.05fr_1fr] md:gap-10 md:p-8 md:pt-12">
            {/* Galeri */}
            <div
              className={`space-y-2.5 sm:space-y-3 md:sticky md:top-0 md:self-start ${
                view === "checkout" ? "hidden md:block" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => openLightbox(gallery, activeImg)}
                aria-label="Perbesar gambar produk"
                // HP: rasio 4:3 dan dibatasi tingginya supaya info produk cepat terlihat tanpa scroll jauh
                className="group relative block aspect-[4/3] max-h-[40dvh] w-full cursor-zoom-in overflow-hidden rounded-xl bg-cream-100 sm:aspect-square sm:max-h-none sm:rounded-2xl"
              >
                <SafeImage
                  key={activeImg}
                  src={gallery[activeImg].src}
                  alt={gallery[activeImg].alt}
                  sizes="(min-width: 768px) 480px, 100vw"
                  label={product.name}
                  priority
                />
                <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded-full bg-ink-900/75 px-2.5 py-1.5 font-body text-[11px] font-semibold text-cream-50 backdrop-blur sm:bottom-3 sm:right-3 sm:px-3 sm:text-xs">
                  <FiZoomIn /> Perbesar
                </span>
              </button>

              {gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {gallery.map((img, i) => (
                    <button
                      key={`${img.src}-${i}`}
                      type="button"
                      onClick={() => setActiveImg(i)}
                      aria-label={`Tampilkan foto ${i + 1}`}
                      aria-current={i === activeImg}
                      className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 bg-cream-100 transition sm:h-16 sm:w-16 sm:rounded-xl ${
                        i === activeImg
                          ? "border-clay-500"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <SafeImage src={img.src} alt={img.alt} sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Panel kanan */}
            <div className="min-w-0">
              {view === "detail" ? (
                <div className="flex flex-col gap-3.5 sm:gap-5">
                  <div className="flex flex-wrap items-center gap-1.5 font-body text-[11px] sm:gap-2 sm:text-xs">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-clay-500/10 px-2.5 py-1 font-semibold text-ink-900 sm:px-3">
                      <FiAward className="text-clay-500" /> Sponsor:{" "}
                      {sponsor.name}
                    </span>
                    <span className="rounded-full bg-ink-900/5 px-2.5 py-1 text-ink-900/70 sm:px-3">
                      {product.category}
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-bold leading-snug sm:text-3xl sm:leading-tight md:text-4xl">
                    {product.name}
                  </h2>

                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("ulasan")
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                    className="flex w-fit flex-wrap items-center gap-x-2 gap-y-1 font-body text-[13px] sm:gap-2.5 sm:text-sm"
                  >
                    <StarRating value={avg} size={15} />
                    <span className="font-semibold">
                      {count ? avg.toFixed(1) : "Belum ada rating"}
                    </span>
                    {count > 0 && (
                      <span className="text-ink-900/60 underline underline-offset-4">
                        {count} ulasan
                      </span>
                    )}
                    <span className="text-ink-900/60">
                      {product.sold} terjual
                    </span>
                  </button>

                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 sm:gap-3">
                    <p className="font-display text-2xl font-bold text-clay-500 sm:text-4xl">
                      {formatRupiah(product.price)}
                    </p>
                    {product.originalPrice && (
                      <>
                        <p className="font-body text-sm text-ink-900/40 line-through sm:text-base">
                          {formatRupiah(product.originalPrice)}
                        </p>
                        <span className="rounded-full bg-clay-500 px-2 py-0.5 font-body text-[11px] font-bold text-white sm:px-2.5 sm:py-1 sm:text-xs">
                          Hemat {discount}%
                        </span>
                      </>
                    )}
                  </div>

                  <p className="font-body text-sm leading-relaxed text-ink-900/80 sm:text-base">
                    {product.description}
                  </p>

                  {product.features?.length > 0 && (
                    <ul className="space-y-1.5 font-body text-[13px] leading-snug text-ink-900/80 sm:space-y-2 sm:text-sm">
                      {product.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <FiCheck className="mt-0.5 shrink-0 text-clay-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 border-t border-ink-900/10 pt-4 sm:gap-x-5 sm:gap-y-3 sm:pt-5">
                    <QtyStepper
                      value={qty}
                      onChange={setQty}
                      max={Math.max(1, product.stock)}
                    />
                    <p className="font-body text-[13px] text-ink-900/60 sm:text-sm">
                      {soldOut ? (
                        "Stok habis"
                      ) : product.stock <= 5 ? (
                        <span className="font-semibold text-clay-500">
                          Sisa {product.stock} lagi
                        </span>
                      ) : (
                        `Stok ${product.stock}`
                      )}
                    </p>
                    {/* Subtotal hanya di layar besar; di HP sudah tampil di bar bawah */}
                    <p className="ml-auto hidden font-body text-sm sm:block">
                      Subtotal{": "}
                      <span className="font-display text-lg font-bold">
                        {formatRupiah(product.price * qty)}
                      </span>
                    </p>
                  </div>

                  {/* Tombol pesan versi tablet/desktop */}
                  <button
                    type="button"
                    onClick={() => setView("checkout")}
                    disabled={soldOut}
                    className="hidden items-center justify-center gap-2.5 rounded-full bg-clay-500 px-6 py-4 font-body text-base font-bold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 sm:inline-flex"
                  >
                    <FiShoppingBag size={18} /> Pesan sekarang
                  </button>

                  <p className="flex items-start gap-2 rounded-xl bg-ink-900/[0.04] p-3 font-body text-[13px] leading-relaxed text-ink-900/75 sm:rounded-2xl sm:p-4 sm:text-sm">
                    <FiMapPin className="mt-0.5 shrink-0 text-clay-500" />
                    <span>
                      Ambil di {storeConfig.pickupPoint} gratis ongkir. COD atau
                      QRIS diantar, ongkir{" "}
                      {formatRupiah(storeConfig.shippingPerKm)} per km dan
                      dihitung lewat WhatsApp setelah kamu kirim share location.
                    </span>
                  </p>
                </div>
              ) : (
                <CheckoutForm
                  product={product}
                  sponsor={sponsor}
                  seller={seller}
                  qty={qty}
                  onQtyChange={setQty}
                  onBack={() => setView("detail")}
                />
              )}
            </div>
          </div>

          {view === "detail" && (
            <Reviews reviews={product.reviews} onOpenImages={openLightbox} />
          )}
        </div>

        {/* Bar bawah khusus HP: tombol pesan selalu terjangkau jempol, tidak ikut ter-scroll */}
        {view === "detail" && (
          <div className="shrink-0 border-t border-ink-900/10 bg-cream-50 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:hidden">
            <div className="flex items-center gap-3">
              <div className="shrink-0">
                <p className="font-body text-[11px] leading-none text-ink-900/60">
                  Subtotal
                </p>
                <p className="mt-1 font-display text-lg font-bold leading-none">
                  {formatRupiah(product.price * qty)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setView("checkout")}
                disabled={soldOut}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-clay-500 px-5 py-3.5 font-body text-[15px] font-bold text-white transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FiShoppingBag size={17} /> {soldOut ? "Stok habis" : "Pesan sekarang"}
              </button>
            </div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onIndexChange={(i) => setLightbox((l) => ({ ...l, index: i }))}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}