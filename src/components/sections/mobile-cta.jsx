"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { eventInfo } from "@/data/dummy";

export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const daftar = document.getElementById("daftar");
      const heroDone = window.scrollY > window.innerHeight * 0.9;
      const pastForm = daftar ? window.scrollY > daftar.offsetTop - 200 : false;
      setVisible(heroDone && !pastForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 260 }}
          className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-2xl border-2 border-ink-900/10 bg-cream-50/95 p-3 pl-4 shadow-2xl backdrop-blur-md lg:hidden"
        >
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-ink-900">{eventInfo.name} {eventInfo.year}</p>
            <p className="truncate text-[11px] text-ink-900/50">{eventInfo.date}</p>
          </div>
          <Button asChild size="sm" className="shrink-0">
            <a href="#daftar">
              Daftar <FiArrowUpRight />
            </a>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
