"use client";

import { motion } from "framer-motion";
import { FiAward, FiShoppingBag } from "react-icons/fi";
import { SafeImage, StarRating } from "./shared";
import { formatRupiah, getRatingStats } from "@/lib/store-utils";

export function ProductCard({ product, sponsor, onOpen }) {
  const { avg, count } = getRatingStats(product.reviews);
  const [first, second] = product.images || [];
  const soldOut = product.stock <= 0;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white transition-shadow duration-300 hover:shadow-[0_18px_40px_-18px_rgba(216,90,48,0.45)]"
    >
      <button
        type="button"
        onClick={() => onOpen(product, "detail")}
        aria-label={`Lihat detail ${product.name}`}
        className="relative block aspect-[4/5] overflow-hidden bg-cream-100 text-left"
      >
        <SafeImage
          src={first}
          alt={product.name}
          label={product.name}
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 50vw"
          className="transition duration-500 group-hover:scale-105"
        />
        {second && (
          <SafeImage
            src={second}
            alt={`${product.name} foto 2`}
            label={product.name}
            sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 50vw"
            className="opacity-0 transition duration-500 group-hover:opacity-100"
          />
        )}


       

        {soldOut ? (
          <span className="absolute inset-0 grid place-items-center bg-ink-900/60 font-display text-lg font-bold text-cream-50">
            Stok habis
          </span>
        ) : product.stock <= 5 ? (
          <span className="absolute bottom-2.5 left-2.5 rounded-full bg-amber-500 px-2.5 py-1 font-body text-[11px] font-bold text-ink-900">
            Sisa {product.stock}
          </span>
        ) : null}
      </button>

      <div className="flex flex-1 flex-col gap-3 p-3.5 sm:p-4">
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-ink-900">
          {product.name}
        </h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-xs text-ink-900/60">
          {count > 0 ? (
            <>
              <StarRating value={avg} size={13} />
              <span className="font-semibold text-ink-900">{avg.toFixed(1)}</span>
              <span>({count})</span>
            </>
          ) : (
            <span>Belum ada ulasan</span>
          )}
          <span>{product.sold} terjual</span>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className="font-display text-xl font-bold text-clay-500">
              {formatRupiah(product.price)}
            </p>
            {product.originalPrice && (
              <p className="font-body text-xs text-ink-900/40 line-through">
                {formatRupiah(product.originalPrice)}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => onOpen(product, "checkout")}
            disabled={soldOut}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 font-body text-sm font-semibold text-cream-50 transition hover:bg-clay-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink-900"
          >
            <FiShoppingBag /> Pesan
          </button>
        </div>
      </div>
    </motion.article>
  );
}