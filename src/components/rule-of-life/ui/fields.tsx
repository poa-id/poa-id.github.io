"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded border border-rol-input bg-rol-card px-3 py-2 text-base sm:text-sm text-rol-foreground placeholder:text-rol-muted-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rol-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
)
Input.displayName = "Input"

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded border border-rol-input bg-rol-card px-3 py-2 text-base sm:text-sm text-rol-foreground placeholder:text-rol-muted-foreground/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rol-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = "Textarea"

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-xs uppercase tracking-widest text-rol-muted-foreground/80", className)}
      {...props}
    />
  )
}
