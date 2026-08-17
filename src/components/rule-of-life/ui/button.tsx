"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rol-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "bg-rol-primary text-rol-primary-foreground hover:bg-rol-primary/90 rounded shadow-soft",
        destructive: "bg-rol-destructive text-rol-destructive-foreground hover:bg-rol-destructive/90 rounded",
        outline: "border border-rol-border bg-transparent hover:bg-rol-muted/50 rounded",
        secondary: "bg-rol-secondary text-rol-secondary-foreground hover:bg-rol-secondary/80 rounded",
        ghost: "hover:bg-rol-muted/50 hover:text-rol-foreground rounded",
        link: "text-rol-primary underline-offset-4 hover:underline",
        observe:
          "bg-rol-card text-rol-muted-foreground border border-rol-border/60 hover:bg-rol-muted/50 hover:text-rol-foreground rounded-full",
        observed: "bg-rol-primary text-rol-primary-foreground shadow-soft rounded-full",
        increment: "border border-rol-border/60 bg-rol-card hover:bg-rol-muted/50 text-rol-foreground rounded",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
        pill: "h-9 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => (
    <button ref={ref} type={type} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
)
Button.displayName = "Button"
