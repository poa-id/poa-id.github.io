import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { LineforgeApp } from "@/components/lineforge/LineforgeApp"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lf-mono",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lf-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Lineforge — Daily Art Practice",
  description: "Deck-driven daily art practice with structured training blocks and 3D viewer.",
}

export default function LineforgePage() {
  return <LineforgeApp monoVar={jetbrainsMono.variable} sansVar={inter.variable} />
}
