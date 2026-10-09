"use client";

import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { SafeImage, useLockBodyScroll } from "./shared";

/**
 * Pratinjau gambar layar penuh.
 * images: [{ src, alt }]  |  index: gambar aktif  |  geser / panah keyboard / thumbnail untuk pindah
 */
export function Lightbox({ images, index, onIndexChange, onClose }) {
  const total = images.length;
  useLockBodyScroll(true);

  const go = useCallback(
    (dir) => onIndexChange((index + dir + total) % total),
    [index, total, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (total > 1 && e.key === "ArrowRight") go(1);
      if (total > 1 && e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose, total]);

  const current = images[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau gambar"
      className="fixed inset-0 z-[130] flex flex-col bg-ink-900/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="font-body text-sm text-cream-100/70">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup pratinjau"
          className="grid h-10 w-10 place-items-center rounded-full bg-cream-50/10 text-cream-50 transition hover:bg-cream-50/20"
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="relative min-h-0 flex-1" onClick={onClose}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className="absolute inset-x-4 inset-y-2 cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing sm:inset-x-20"
            drag={total > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => e.stopPropagation()}
          >
            <SafeImage
              src={current.src}
              alt={current.alt}
              fit="contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Gambar sebelumnya"
              className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream-50/10 text-cream-50 transition hover:bg-cream-50/25 sm:grid"
            >
              <FiChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Gambar berikutnya"
              className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream-50/10 text-cream-50 transition hover:bg-cream-50/25 sm:grid"
            >
              <FiChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex justify-center gap-2 overflow-x-auto px-4 py-4">
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={`Lihat gambar ${i + 1}`}
              aria-current={i === index}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === index
                  ? "border-amber-500"
                  : "border-transparent opacity-50 hover:opacity-90"
              }`}
            >
              <SafeImage src={img.src} alt={img.alt} sizes="56px" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}