"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`
}

export function useTimer({
  totalSeconds,
  onComplete,
  autoStart = false,
}: {
  totalSeconds: number
  onComplete?: () => void
  autoStart?: boolean
}) {
  const [remaining, setRemaining] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(autoStart)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    setRemaining(totalSeconds)
    setIsRunning(false)
  }, [totalSeconds])

  useEffect(() => {
    if (!isRunning || remaining <= 0) return
    const id = window.setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          onCompleteRef.current?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [isRunning, remaining])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const reset = useCallback(() => {
    setIsRunning(false)
    setRemaining(totalSeconds)
  }, [totalSeconds])

  return { remaining, isRunning, start, pause, reset, setRemaining }
}
