"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"
import { HALL_DESKTOP_COLUMN, HALL_MOBILE_GRID } from "@/lib/hall-layout"

export function Nav() {
  return (
    <nav className="fixed top-0 w-full border-b bg-white dark:bg-[#0F1015] dark:border-gray-800 z-50">
      <div className="w-full mx-auto flex items-center justify-between h-14 lg:h-24">
        <div className="w-full lg:w-1/2 flex items-center min-w-0">
          <div className={`${HALL_MOBILE_GRID} ${HALL_DESKTOP_COLUMN}`}>
            <Link href="/" className="col-span-1 flex items-center py-2 lg:col-span-auto">
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
        <div className="flex items-center space-x-3 lg:space-x-8 px-4 lg:px-8">
          <Link 
            href="/about" 
            className="text-xs lg:text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link 
            href="/work" 
            className="text-xs lg:text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            Work
          </Link>
          <Link 
            href="/art" 
            className="text-xs lg:text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            Art
          </Link>
          <Link 
            href="/now" 
            className="text-xs lg:text-base text-muted-foreground hover:text-foreground transition-colors"
          >
            Now
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
} 