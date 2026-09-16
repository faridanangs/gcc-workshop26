"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

// Placeholder karakter yang deterministic (BUKAN random) — dipakai
// sebelum component mount, supaya hasil render server & client identik
// saat first paint. Ini kunci utama menghindari hydration mismatch.
function placeholderChar(index) {
  return SCRAMBLE_CHARS[index % SCRAMBLE_CHARS.length];
}

export function EncryptedText({
  text,
  encryptedClassName,
  revealedClassName,
  revealDelayMs = 80,
  // once=true → animasi cuma jalan sekali pas pertama kali section
  // masuk viewport. Set false kalau mau replay tiap kali di-scroll
  // masuk/keluar lagi.
  once = true,
  // seberapa jauh sebelum elemen bener2 kelihatan, trigger sudah nyala
  viewMargin = "-80px",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: viewMargin });

  const [revealedCount, setRevealedCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [scrambleTick, setScrambleTick] = useState(0);

  // Hydration-safety: baru dianggap "mounted" setelah efek ini jalan
  // di client, terpisah dari logic isInView, supaya first paint dari
  // server tetap pakai placeholderChar yang deterministic.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Belum masuk viewport → jangan mulai animasi apa-apa dulu.
    if (!isInView) {
      // Kalau once=false, reset supaya bisa replay saat masuk viewport lagi.
      if (!once) {
        setRevealedCount(0);
      }
      return;
    }

    let current = 0;
    setRevealedCount(0);

    const revealInterval = setInterval(() => {
      current += 1;
      setRevealedCount(current);
      if (current >= text.length) {
        clearInterval(revealInterval);
      }
    }, revealDelayMs);

    // Bikin karakter yang belum terungkap terus "berkedip" acak,
    // biar berasa efek decrypt/hacker — murni kosmetik, jalan
    // sepenuhnya di client, tidak menyentuh hasil render server.
    const scrambleInterval = setInterval(() => {
      setScrambleTick((t) => t + 1);
    }, 55);

    return () => {
      clearInterval(revealInterval);
      clearInterval(scrambleInterval);
    };
  }, [isInView, text, revealDelayMs, once]);

  return (
    <motion.span ref={ref} aria-label={text} role="text">
      {text.split("").map((char, index) => {
        const isRevealed = index < revealedCount;
        const displayChar = isRevealed
          ? char
          : mounted
            ? SCRAMBLE_CHARS[
                Math.floor(Math.random() * SCRAMBLE_CHARS.length)
              ]
            : placeholderChar(index);

        return (
          <span
            key={index}
            className={cn(isRevealed ? revealedClassName : encryptedClassName)}
          >
            {displayChar}
          </span>
        );
      })}
    </motion.span>
  );
}