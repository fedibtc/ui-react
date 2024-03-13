"use client"

import * as RadixToast from "@radix-ui/react-toast"
import React from "react"
import { useToast, Toast, ToastContext } from "../hooks"
import { styled } from "react-tailwind-variants"
import { Text } from "./text"
import { Icon } from "./icon"

/**
 * Toaster component that displays a toast message on top of the page.
 * Should be placed in the root project layout.
 */
function Toaster() {
  const [cachedToast, setCachedToast] = React.useState<Toast | null>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [md, setMd] = React.useState(false)

  const { toast, close } = useToast()

  const handleCloseToast = React.useCallback(
    (open: boolean) => {
      setIsOpen(open)
      if (!open) close()
    },
    [toast, close]
  )

  React.useEffect(() => {
    if (toast) {
      setCachedToast(toast)
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [toast])

  React.useEffect(() => {
    const handleResize = () => {
      setMd(window.innerWidth < 980)
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <RadixToast.Provider
      swipeDirection={md ? "up" : "right"}
      duration={Infinity}
    >
      <Toast
        key={cachedToast?.key}
        open={isOpen}
        onOpenChange={handleCloseToast}
        duration={Infinity}
      >
        {cachedToast && (
          <ToastInner>
            <ToastIcon>
              {cachedToast?.status === "success"
                ? "👍"
                : cachedToast?.status === "info"
                  ? "👀"
                  : "⚠️"}
            </ToastIcon>
            <Description>
              <Text variant="caption">{cachedToast?.content}</Text>
            </Description>
            <CloseIcon onClick={() => handleCloseToast(false)}>
              <Icon icon="IconX" />
            </CloseIcon>
          </ToastInner>
        )}
      </Toast>
      <ToastViewport />
    </RadixToast.Provider>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState<Toast | null>(null)

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}

const ToastViewport = styled(RadixToast.Viewport, {
  base: "fixed top-[32px] right-[20px] w-full max-w-[320px] p-0 z-[2147483647] list-none outline-none md:flex md:justify-center md:bottom-auto md:right-auto md:top-[20px] md:left-1/2 md:-translate-x-1/2 xs:width-[calc(100%-24px)]"
})

const Toast = styled(RadixToast.Root, {
  base: "w-full rounded-[16px] bg-black text-left bg-gradient-to-b from-[rgba(255,255,255,0.15)] to-[rgba(255,255,255,0)] shadow-toast data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:translate-y-0 data-[swipe=end]:min-sm:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:sm:translate-y-[var(--radix-toast-swipe-end-y)] data-[swipe=move]:min-sm:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:sm:translate-y-[var(--radix-toast-swipe-move-y)] data-[swipe=move]:transition-none data-[swipe=end]:animate-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:min-sm:slide-out-to-right-full data-[state=closed]:sm:slide-out-to-top-full data-[state=open]:min-sm:slide-in-from-right-full data-[state=open]:sm:slide-in-from-top-full"
})

const ToastInner = styled("div", {
  base: "flex gap-[12px] p-[14px] rounded-[16px] bg-holo-400 items-center text-white"
})

const CloseIcon = styled("button", {
  base: "text-grey text-[20px] w-[20px] h-[20px] flex-shrink-0"
})

const ToastIcon = styled(Text, {
  base: "text-[20px] shrink-0"
})

const Description = styled(RadixToast.Description, {
  base: "grow"
})
