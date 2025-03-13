"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"

export function Nav() {
  return (
    <nav className="fixed top-0 w-full border-b bg-white dark:bg-[#0C0E15] dark:border-gray-800 z-50">
      <div className="w-full mx-auto flex items-center justify-between h-24">
        <div className="w-full lg:w-1/2 flex items-center">
          <div className="w-full lg:w-4/5 mx-auto">
            <Link href="/" className="flex items-center py-2">
              <Image
                src="/logo.svg"
                alt="Poa"
                width={20}
                height={20}
                className="dark:invert"
              />
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-8 px-6 lg:px-8">
          <Link 
            href="/about" 
            className="text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link 
            href="/work" 
            className="text-sm lg:text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            Work
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
} 