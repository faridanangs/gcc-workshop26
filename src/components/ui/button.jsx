"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50",
  {
    variants: {
      variant: {
        default:
          "bg-clay-500 text-cream-50 shadow-[0_6px_0_0_#9c3a1d] hover:shadow-[0_3px_0_0_#9c3a1d] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px]",
        secondary:
          "bg-ink-900 text-cream-100 shadow-[0_6px_0_0_#000] hover:shadow-[0_3px_0_0_#000] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px]",
        outline:
          "border-2 border-ink-900 bg-transparent text-ink-900 hover:bg-ink-900 hover:text-cream-100",
        ghost: "bg-transparent text-ink-900 hover:bg-clay-100",
        amber:
          "bg-amber-500 text-ink-950 shadow-[0_6px_0_0_#a5670a] hover:shadow-[0_3px_0_0_#a5670a] hover:translate-y-[3px] active:shadow-none active:translate-y-[6px]",
        link: "text-clay-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
