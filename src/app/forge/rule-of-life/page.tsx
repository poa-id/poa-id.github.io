import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { RuleOfLifeApp } from "@/components/rule-of-life/RuleOfLifeApp"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-rol-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-rol-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pillars — The Forge",
  description: "A personal Rule of Life for practice, attention and daily observance.",
}

export default function RuleOfLifePage() {
  return <RuleOfLifeApp serifVar={cormorant.variable} sansVar={inter.variable} />
}
