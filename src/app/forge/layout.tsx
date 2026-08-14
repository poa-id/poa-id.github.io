"use client"

import { ForgeShell } from "@/components/forge/forge-shell"

export default function ForgeLayout({ children }: { children: React.ReactNode }) {
  return <ForgeShell>{children}</ForgeShell>
}
