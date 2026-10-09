"use client";

import { useMemo, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { SafeImage, StarRating } from "./shared";
import { formatDate, getRatingStats } from "@/lib/store-utils";
function FilterChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 font-body text-xs font-semibold transition ${
        active
          ? "border-ink-900 bg-ink-900 text-cream-50"
          : "border-ink-900/15 bg-white text-ink-900 hover:border-ink-900/40"
      }`}
    >
      {children}
    </button>
  );
}

const initials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/**
 * Ulasan produk.
 * onOpenImages(images, index) -> membuka lightbox (images: [{ src, alt }])
 */
export function Reviews({ reviews, onOpenImages }) {
  const [filter, setFilter] = useState("all"); // "all" | "photo" | 1..5
  const { avg, count, dist } = useMemo(() => getRatingStats(reviews), [reviews]);

  const sorted = useMemo(
    () => [...reviews].sort((a, b) => b.date.localeCompare(a.date)),
    [reviews],
  );

  const allPhotos = useMemo(
    () =>
      sorted.flatMap((r) =>
        (r.images || []).map((src, i) => ({
          src,
          alt: `Foto ulasan ${r.name} ${i + 1}`,
        })),
      ),
    [sorted],
  );

  const withPhotoCount = sorted.filter((r) => r.images?.length).length;

  const filtered = sorted.filter((r) => {
    if (filter === "all") return true;
    if (filter === "photo") return r.images?.length > 0;
    return r.rating === filter;
  });

  return (
    <section
      id="ulasan"
      aria-labelledby="ulasan-title"
      className="border-t border-ink-900/10 bg-white/60 px-4 py-8 sm:px-6 md:px-8"
    >
      <h3 id="ulasan-title" className="font-display text-2xl font-bold">
        Ulasan pembeli
      </h3>

      {count === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-ink-900/20 p-6 text-center font-body text-sm text-ink-900/60">
          Belum ada ulasan untuk produk ini. Jadi yang pertama setelah pesananmu sampai.
        </p>
      ) : (
        <>
          <div className="mt-5 grid gap-6 md:grid-cols-[220px_1fr] md:gap-10">
            {/* Ringkasan */}
            <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-2">
              <p className="font-display text-5xl font-bold leading-none">
                {avg.toFixed(1)}
                <span className="ml-1 text-lg font-medium text-ink-900/50">/5</span>
              </p>
              <div>
                <StarRating value={avg} size={18} />
                <p className="mt-1 font-body text-sm text-ink-900/60">{count} ulasan</p>
              </div>
            </div>

            {/* Distribusi (klik untuk filter) */}
            <ul className="space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = (dist[star] / count) * 100;
                return (
                  <li key={star}>
                    <button
                      type="button"
                      onClick={() => setFilter(filter === star ? "all" : star)}
                      disabled={dist[star] === 0}
                      className="flex w-full items-center gap-3 rounded-lg px-1 py-0.5 text-left font-body text-xs transition hover:bg-ink-900/5 disabled:opacity-40 disabled:hover:bg-transparent"
                      aria-label={`Filter ulasan bintang ${star}, ${dist[star]} ulasan`}
                    >
                      <span className="w-6 shrink-0 font-semibold tabular-nums">{star}★</span>
                      <span className="h-2 flex-1 overflow-hidden rounded-full bg-ink-900/10">
                        <span
                          className="block h-full rounded-full bg-clay-500"
                          style={{ width: `${pct}%` }}
                        />
                      </span>
                      <span className="w-6 shrink-0 text-right tabular-nums text-ink-900/60">
                        {dist[star]}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Semua foto dari pembeli */}
          {allPhotos.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 flex items-center gap-2 font-body text-sm font-semibold">
                <FiCamera className="text-clay-500" /> Foto dari pembeli
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allPhotos.map((img, i) => (
                  <button
                    key={`${img.src}-${i}`}
                    type="button"
                    onClick={() => onOpenImages(allPhotos, i)}
                    aria-label={`Perbesar foto ulasan ${i + 1}`}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-100 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-clay-500"
                  >
                    <SafeImage src={img.src} alt={img.alt} sizes="80px" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filter */}
          <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
            <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
              Semua ({count})
            </FilterChip>
            {withPhotoCount > 0 && (
              <FilterChip active={filter === "photo"} onClick={() => setFilter("photo")}>
                Dengan foto ({withPhotoCount})
              </FilterChip>
            )}
            {[5, 4, 3, 2, 1]
              .filter((s) => dist[s] > 0)
              .map((s) => (
                <FilterChip key={s} active={filter === s} onClick={() => setFilter(s)}>
                  {s}★ ({dist[s]})
                </FilterChip>
              ))}
          </div>

          {/* Daftar ulasan */}
          <ul className="mt-5 space-y-3">
            {filtered.length === 0 && (
              <li className="rounded-2xl border border-dashed border-ink-900/20 p-6 text-center font-body text-sm text-ink-900/60">
                Tidak ada ulasan untuk filter ini.
              </li>
            )}
            {filtered.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-ink-900/10 bg-white p-4 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <div
                    aria-hidden="true"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-clay-500 to-amber-500 font-display text-sm font-bold text-white"
                  >
                    {initials(r.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-x-3">
                      <p className="font-body text-sm font-semibold">{r.name}</p>
                      <time dateTime={r.date} className="font-body text-xs text-ink-900/50">
                        {formatDate(r.date)}
                      </time>
                    </div>
                    <StarRating value={r.rating} size={14} />
                  </div>
                </div>

                <p className="mt-3 font-body text-sm leading-relaxed text-ink-900/80">
                  {r.comment}
                </p>

                {r.images?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {r.images.map((src, i) => (
                      <button
                        key={`${src}-${i}`}
                        type="button"
                        onClick={() =>
                          onOpenImages(
                            r.images.map((s, j) => ({
                              src: s,
                              alt: `Foto ulasan ${r.name} ${j + 1}`,
                            })),
                            i,
                          )
                        }
                        aria-label={`Perbesar foto ${i + 1} dari ulasan ${r.name}`}
                        className="relative h-20 w-20 overflow-hidden rounded-xl bg-cream-100 transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-clay-500"
                      >
                        <SafeImage
                          src={src}
                          alt={`Foto ulasan ${r.name} ${i + 1}`}
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}