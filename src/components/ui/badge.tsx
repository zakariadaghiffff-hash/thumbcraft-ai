import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-neon-purple/20 text-neon-purple",
        secondary: "border-transparent bg-white/10 text-white/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "border-white/20 text-white/80",
        neon: "border-neon-purple/30 bg-neon-purple/10 text-neon-purple shadow-sm shadow-neon-purple/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
