"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiImage, FiMinus, FiPlus, FiStar } from "react-icons/fi";

/** Kunci scroll halaman selama modal / lightbox terbuka. */
export function useLockBodyScroll(locked = true) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

/**
 * Gambar yang aman: kalau src kosong / gagal dimuat, tampil placeholder
 * bertema terracotta. Parent WAJIB `relative` (pakai next/image `fill`).
 */
export function SafeImage({
  src,
  alt,
  sizes = "100vw",
  fit = "cover",
  label,
  className = "",
  priority = false,
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-clay-500/25 via-amber-500/15 to-cream-100 p-3 text-center"
      >
        <FiImage className="h-7 w-7 text-clay-500/80" aria-hidden="true" />
        {label ? (
          <span className="line-clamp-2 font-body text-xs font-medium text-ink-900/60">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
    />
  );
}

/** Bintang rating, mendukung nilai desimal (mis. 4.6). */
export function StarRating({ value = 0, size = 16, className = "" }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const stars = [0, 1, 2, 3, 4];

  return (
    <span
      className={`relative inline-flex ${className}`}
      role="img"
      aria-label={`Rating ${value.toFixed(1)} dari 5`}
    >
      <span className="flex text-ink-900/20">
        {stars.map((i) => (
          <FiStar key={i} size={size} fill="currentColor" className="shrink-0" />
        ))}
      </span>
      <span
        className="absolute inset-y-0 left-0 flex overflow-hidden text-amber-500"
        style={{ width: `${pct}%` }}
      >
        {stars.map((i) => (
          <FiStar key={i} size={size} fill="currentColor" className="shrink-0" />
        ))}
      </span>
    </span>
  );
}

/** Tombol - / + untuk jumlah pesanan. */
export function QtyStepper({ value, onChange, min = 1, max = 99 }) {
  return (
    <div
      role="group"
      aria-label="Jumlah pesanan"
      className="inline-flex items-center rounded-full border border-ink-900/15 bg-white p-1"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Kurangi jumlah"
        className="grid h-9 w-9 place-items-center rounded-full text-ink-900 transition hover:bg-ink-900/5 disabled:opacity-30"
      >
        <FiMinus />
      </button>
      <span
        className="w-10 text-center font-body text-sm font-semibold tabular-nums text-ink-900"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Tambah jumlah"
        className="grid h-9 w-9 place-items-center rounded-full text-ink-900 transition hover:bg-ink-900/5 disabled:opacity-30"
      >
        <FiPlus />
      </button>
    </div>
  );
}