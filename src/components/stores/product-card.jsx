"use client";

import { motion } from "framer-motion";
import { FiShoppingBag, FiStar } from "react-icons/fi";
import { SafeImage, StarRating } from "./shared";
import { formatRupiah, getRatingStats } from "@/lib/store-utils";

export function ProductCard({ product, onOpen }) {
  const { avg, count } = getRatingStats(product.reviews);
  const [first, second] = product.images || [];
  const soldOut = product.stock <= 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white transition-shadow duration-300 [@media(hover:hover)]:hover:shadow-[0_18px_40px_-18px_rgba(216,90,48,0.45)]"
    >
      {/* Gambar: persegi di HP supaya kartu tidak terlalu tinggi, 4:5 di layar lebar */}
      <button
        type="button"
        onClick={() => onOpen(product, "detail")}
        aria-label={`Lihat detail ${product.name}`}
        className="relative block aspect-square overflow-hidden bg-cream-100 text-left active:opacity-90 sm:aspect-[4/5]"
      >
        <SafeImage
          src={first}
          alt={product.name}
          label={product.name}
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 50vw"
          className="transition duration-500 [@media(hover:hover)]:group-hover:scale-105"
        />
        {second && (
          <SafeImage
            src={second}
            alt={`${product.name} foto 2`}
            label={product.name}
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 50vw"
            className="opacity-0 transition duration-500 [@media(hover:hover)]:group-hover:opacity-100"
          />
        )}

        {soldOut ? (
          <span className="absolute inset-0 grid place-items-center bg-ink-900/60 font-display text-base font-bold text-cream-50 sm:text-lg">
            Stok habis
          </span>
        ) : product.stock <= 5 ? (
          <span className="absolute bottom-2 left-2 rounded-full bg-amber-500 px-2 py-0.5 font-body text-[10px] font-bold text-ink-900 sm:bottom-2.5 sm:left-2.5 sm:px-2.5 sm:py-1 sm:text-[11px]">
            Sisa {product.stock}
          </span>
        ) : null}
      </button>

      <div className="flex flex-1 flex-col gap-2.5 p-3 sm:gap-3 sm:p-4">
        {/* Area info ikut bisa diketuk (bukan cuma gambar) */}
        <button
          type="button"
          onClick={() => onOpen(product, "detail")}
          aria-label={`Lihat detail ${product.name}`}
          className="flex flex-1 flex-col gap-1.5 text-left sm:gap-2"
        >
          <h3 className="line-clamp-2 font-display text-[13px] font-semibold leading-snug text-ink-900 sm:text-base">
            {product.name}
          </h3>

          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 font-body text-[11px] text-ink-900/60 sm:gap-x-2 sm:text-xs">
            {count > 0 ? (
              <>
                {/* HP: 1 bintang saja supaya ringkas. Layar lebar: 5 bintang */}
                <span className="hidden sm:inline-flex">
                  <StarRating value={avg} size={13} />
                </span>
                <FiStar
                  size={12}
                  fill="currentColor"
                  aria-hidden="true"
                  className="shrink-0 text-amber-500 sm:hidden"
                />
                <span className="font-semibold text-ink-900">{avg.toFixed(1)}</span>
                <span>({count})</span>
              </>
            ) : (
              <span>Belum ada ulasan</span>
            )}
            {product.sold > 0 && (
              <>
                <span aria-hidden="true">•</span>
                <span>{product.sold} terjual</span>
              </>
            )}
          </div>

          <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-0.5">
            <p className="font-display text-lg font-bold text-clay-500 sm:text-xl">
              {formatRupiah(product.price)}
            </p>
            {product.originalPrice && (
              <p className="font-body text-[11px] text-ink-900/40 line-through sm:text-xs">
                {formatRupiah(product.originalPrice)}
              </p>
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => onOpen(product, "checkout")}
          disabled={soldOut}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-ink-900 px-4 py-2 font-body text-[13px] font-semibold text-cream-50 transition active:bg-clay-500 disabled:pointer-events-none disabled:opacity-40 sm:text-sm [@media(hover:hover)]:hover:bg-clay-500"
        >
          <FiShoppingBag /> {soldOut ? "Habis" : "Pesan"}
        </button>
      </div>
    </motion.article>
  );
}