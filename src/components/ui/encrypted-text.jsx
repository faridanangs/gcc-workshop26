// "use client";;
// import React, { useEffect, useRef, useState } from "react";
// import { motion, useInView } from "motion/react";
// import { cn } from "@/lib/utils";

// const DEFAULT_CHARSET =
//   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

// function generateRandomCharacter(charset) {
//   const index = Math.floor(Math.random() * charset.length);
//   return charset.charAt(index);
// }

// function generateGibberishPreservingSpaces(original, charset) {
//   if (!original) return "";
//   let result = "";
//   for (let i = 0; i < original.length; i += 1) {
//     const ch = original[i];
//     result += ch === " " ? " " : generateRandomCharacter(charset);
//   }
//   return result;
// }

// export const EncryptedText = ({
//   text,
//   className,
//   revealDelayMs = 50,
//   charset = DEFAULT_CHARSET,
//   flipDelayMs = 50,
//   encryptedClassName,
//   revealedClassName,
// }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   const [revealCount, setRevealCount] = useState(0);
//   const animationFrameRef = useRef(null);
//   const startTimeRef = useRef(0);
//   const lastFlipTimeRef = useRef(0);
//   const scrambleCharsRef = useRef(text ? generateGibberishPreservingSpaces(text, charset).split("") : []);

//   useEffect(() => {
//     if (!isInView) return;

//     // Reset state for a fresh animation whenever dependencies change
//     const initial = text
//       ? generateGibberishPreservingSpaces(text, charset)
//       : "";
//     scrambleCharsRef.current = initial.split("");
//     startTimeRef.current = performance.now();
//     lastFlipTimeRef.current = startTimeRef.current;
//     setRevealCount(0);

//     let isCancelled = false;

//     const update = (now) => {
//       if (isCancelled) return;

//       const elapsedMs = now - startTimeRef.current;
//       const totalLength = text.length;
//       const currentRevealCount = Math.min(totalLength, Math.floor(elapsedMs / Math.max(1, revealDelayMs)));

//       setRevealCount(currentRevealCount);

//       if (currentRevealCount >= totalLength) {
//         return;
//       }

//       // Re-randomize unrevealed scramble characters on an interval
//       const timeSinceLastFlip = now - lastFlipTimeRef.current;
//       if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
//         for (let index = 0; index < totalLength; index += 1) {
//           if (index >= currentRevealCount) {
//             if (text[index] !== " ") {
//               scrambleCharsRef.current[index] =
//                 generateRandomCharacter(charset);
//             } else {
//               scrambleCharsRef.current[index] = " ";
//             }
//           }
//         }
//         lastFlipTimeRef.current = now;
//       }

//       animationFrameRef.current = requestAnimationFrame(update);
//     };

//     animationFrameRef.current = requestAnimationFrame(update);

//     return () => {
//       isCancelled = true;
//       if (animationFrameRef.current !== null) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, [isInView, text, revealDelayMs, charset, flipDelayMs]);

//   if (!text) return null;

//   return (
//     <motion.span ref={ref} className={cn(className)} aria-label={text} role="text">
//       {text.split("").map((char, index) => {
//         const isRevealed = index < revealCount;
//         const displayChar = isRevealed
//           ? char
//           : char === " "
//             ? " "
//             : (scrambleCharsRef.current[index] ??
//               generateRandomCharacter(charset));

//         return (
//           <span
//             key={index}
//             className={cn(isRevealed ? revealedClassName : encryptedClassName)}>
//             {displayChar}
//           </span>
//         );
//       })}
//     </motion.span>
//   );
// };

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
}) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [scrambleTick, setScrambleTick] = useState(0);

  useEffect(() => {
    // Baru dianggap "mounted" setelah efek ini jalan di client —
    // titik inilah hydration sudah selesai, jadi aman mulai pakai
    // Math.random() dari sini dan seterusnya.
    setMounted(true);

    let current = 0;
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
  }, [text, revealDelayMs]);

  return (
    <motion.span aria-label={text} role="text">
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