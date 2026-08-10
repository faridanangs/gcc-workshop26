import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-xl border-2 border-ink-900/15 bg-cream-50 px-4 py-2 text-sm text-ink-900 placeholder:text-ink-900/40 transition-colors focus-visible:outline-none focus-visible:border-clay-500 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
