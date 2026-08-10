import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold font-mono tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-clay-500 text-cream-50",
        secondary: "border-transparent bg-ink-900 text-cream-100",
        outline: "border-ink-900/25 text-ink-900",
        amber: "border-transparent bg-amber-500 text-ink-950",
        cream: "border-ink-900/10 bg-cream-100 text-ink-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
