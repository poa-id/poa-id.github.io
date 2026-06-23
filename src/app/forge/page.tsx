"use client"

import { CubeFaceShell } from "@/components/cube-face-shell"
import { CubeStubBody } from "@/components/cube-stub-page"
import { DeepDescentLink } from "@/components/deep-descent-link"
import {
  GardenEntryFromForgeEdge,
  GardenReturnFromForgeInline,
} from "@/components/cube-edge-tabs"
import { useCubeFaceThemeForSlug } from "@/hooks/use-cube-face-theme"
import { CUBE_FACE_STUBS } from "@/lib/cube-face-content"

export default function ForgePage() {
  const content = CUBE_FACE_STUBS.forge
  const theme = useCubeFaceThemeForSlug("forge")

  return (
    <>
      <CubeFaceShell
        theme={theme}
        returnEdge={null}
        mobileReturn={<GardenReturnFromForgeInline />}
      >
        <div className="space-y-10">
          <CubeStubBody content={content} theme={theme} />
          <div className="flex justify-center">
            <DeepDescentLink />
          </div>
        </div>
      </CubeFaceShell>
      <GardenEntryFromForgeEdge />
    </>
  )
}
