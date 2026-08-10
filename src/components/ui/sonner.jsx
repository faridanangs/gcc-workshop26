"use client";

import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="light"
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast font-body rounded-2xl border-2 border-ink-900/10 bg-cream-50 text-ink-900 shadow-lg",
          title: "font-display font-semibold",
          description: "text-ink-900/70",
          actionButton: "bg-clay-500 text-cream-50",
          cancelButton: "bg-ink-900/10 text-ink-900",
          success: "!border-clay-500/40",
          error: "!border-destructive/40",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
