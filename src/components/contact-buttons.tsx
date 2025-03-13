"use client"

import * as React from "react"
import { Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function ContactButtons() {
  const [showTooltip, setShowTooltip] = React.useState(false)
  const tooltipTimeout = React.useRef<NodeJS.Timeout | null>(null)

  const copyEmail = async () => {
    await navigator.clipboard.writeText("pjoa93@gmail.com")
    setShowTooltip(true)
    
    if (tooltipTimeout.current) {
      clearTimeout(tooltipTimeout.current)
    }
    
    tooltipTimeout.current = setTimeout(() => {
      setShowTooltip(false)
    }, 2000)
  }

  React.useEffect(() => {
    return () => {
      if (tooltipTimeout.current) {
        clearTimeout(tooltipTimeout.current)
      }
    }
  }, [])

  return (
    <div className="fixed bottom-8 right-8 flex items-center gap-4">
      <Link
        href="https://www.linkedin.com/in/pedro-ossorio-arana/"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm transition-colors"
        aria-label="Visit LinkedIn profile"
      >
        <Linkedin className="w-5 h-5 text-white" />
      </Link>
      
      <div className="relative group">
        <button
          onClick={copyEmail}
          className="p-3 bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 backdrop-blur-sm transition-colors"
          aria-label="Copy email address"
        >
          <Mail className="w-5 h-5 text-white" />
        </button>
        
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 text-sm text-white bg-gray-900/90 dark:bg-gray-800/90 whitespace-nowrap">
            Copied to clipboard!
          </div>
        )}
        
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 text-sm text-white bg-gray-900/90 dark:bg-gray-800/90 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Click to copy
        </div>
      </div>
    </div>
  )
} 