"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform duration-200 dark:rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
} 