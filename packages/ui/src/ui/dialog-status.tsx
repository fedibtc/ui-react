"use client"

import { Icon, IconKey } from "./icon"
import { Text } from "./text"
import React from "react"
import { styled } from "react-tailwind-variants"

export interface DialogStatusProps {
  /**
   * The status of the dialog. Must be one of "success", "error", or "loading".
   */
  status: "success" | "error" | "loading"
  /**
   * The status title
   */
  title?: React.ReactNode
  /**
   * The status description
   */
  description?: React.ReactNode
}

/**
 * Shows a status confirmation once its `status` has switched from `loading` to one of "success" or "error".
 */
export const DialogStatus = ({
  status,
  title,
  description
}: DialogStatusProps) => {
  const [backgroundRotation, setBackgroundRotation] = React.useState(0)
  const [expandedScale, setExpandedScale] = React.useState(3)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  const icon: IconKey | undefined =
    status === "success"
      ? "IconCheck"
      : status === "error"
        ? "IconAlertCircleFilled"
        : undefined

  // Rotate while in loading status
  React.useEffect(() => {
    if (status !== "loading") return
    let isRotating = true
    let prevTime = 0
    const rotate = (time: number) => {
      if (!isRotating) return
      if (!prevTime) prevTime = time
      setBackgroundRotation(deg => deg + (time - prevTime) * 0.1)
      requestAnimationFrame(rotate)
      prevTime = time
    }
    requestAnimationFrame(rotate)

    return () => {
      isRotating = false
    }
  }, [status])

  // Measure the necessary scale based on parent size. Re-run on status
  // change so we have up-to-date sizing on status change.
  React.useEffect(() => {
    const containerEl = containerRef.current
    const contentEl = contentRef.current
    if (!containerEl || !contentEl) return
    const parentEl = containerEl.offsetParent
    if (!parentEl) return
    // Calculate necessary scale using larger of width or height
    const contentRect = contentEl.getBoundingClientRect()
    const parentRect = parentEl.getBoundingClientRect()
    const scaleDelta = Math.max(
      parentRect.width / contentRect.width,
      parentRect.height / contentRect.height
    )
    // Expand further than delta due to circle having cut off corners
    setExpandedScale(scaleDelta * 1.333)
  }, [status])

  return (
    <Container ref={containerRef}>
      <StatusBackground
        status={status}
        style={
          {
            "--rotation": `${backgroundRotation}deg`,
            "--scale": status === "loading" ? 1.04 : expandedScale
          } as React.CSSProperties
        }
      />
      <Content ref={contentRef}>
        {icon && <Icon size="md" icon={icon} />}
        {title && (
          <Text variant="h2" weight="medium">
            {title}
          </Text>
        )}
        {description && <Text variant="caption">{description}</Text>}
      </Content>
    </Container>
  )
}

const Container = styled("div", {
  base: "absolute inset-0 bg-white animate-in fade-in"
})

const Content = styled("div", {
  base: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[280px] aspect-square rounded-full z-[2] flex flex-col justify-center items-center text-center gap-sm bg-white"
})

const StatusBackground = styled("div", {
  base: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[280px] aspect-square rounded-full z-[1] rotate-[var(--rotation)] scale-[var(--scale)] transition-all duration-500",
  variants: {
    status: {
      success: "bg-holo-600",
      error: "bg-extraLightGrey",
      loading: "bg-holo-600 transition-none"
    }
  }
})
