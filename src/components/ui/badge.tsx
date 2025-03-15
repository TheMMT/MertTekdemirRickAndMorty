import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-rick-green/90 text-background hover:bg-rick-green",
        secondary:
          "border-transparent bg-background/50 text-foreground hover:bg-background/80",
        destructive:
          "border-transparent bg-destructive/90 text-destructive-foreground hover:bg-destructive",
        outline: "border-[hsl(var(--border))] bg-background/50 text-foreground hover:bg-background/80 hover:border-portal-blue/50",
        portal: 
          "border-transparent bg-portal-blue/90 text-background hover:bg-portal-blue",
        morty:
          "border-transparent bg-morty-yellow/90 text-background hover:bg-morty-yellow",
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
