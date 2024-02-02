"use client"

import * as RadixToast from "@radix-ui/react-toast"
import React from "react"
import { useToast } from "../hooks"
import { styled } from "react-tailwind-variants"

/**
 * Toaster component that displays a toast message on top of the page.
 * Should be placed in the root project layout.
 */
export function Toaster() {
  const [sm, setSm] = React.useState(false)
  const { toasts } = useToast()

  React.useEffect(() => {
    const resize = () => {
      setSm(window.innerWidth < 600)
    }

    resize()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <RadixToast.Provider swipeDirection={sm ? "up" : "right"} duration={2000}>
      {toasts.map(function ({ id, content, ...props }) {
        return (
          <Toast key={id} {...props}>
            <ToastInner>
              {content && <ToastContent>{content}</ToastContent>}
            </ToastInner>
          </Toast>
        )
      })}
      <ToastViewport />
    </RadixToast.Provider>
  )
}

const ToastViewport = styled(RadixToast.Viewport, {
  base: "bottom-[32px] right-20 sm:bottom-auto sm:right-1/2 sm:top-[32px] sm:translate-x-1/2 fixed z-[2147483647] flex max-h-screen w-full flex-col-reverse max-w-[320px] outline-0 list-style-none p-0"
})

const Toast = styled(RadixToast.Root, {
  base: "group max-w-[320px] pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-[20px] border border-lightGrey shadow-[0_4px_24px_0_rgba(0,0,0,0.1)] bg-white transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:translate-y-0 data-[swipe=end]:min-sm:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=end]:sm:translate-y-[var(--radix-toast-swipe-end-y)] data-[swipe=move]:min-sm:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:sm:translate-y-[var(--radix-toast-swipe-move-y)] data-[swipe=move]:transition-none data-[swipe=end]:animate-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:min-sm:slide-out-to-right-full data-[state=closed]:sm:slide-out-to-top-full data-[state=open]:min-sm:slide-in-from-right-full data-[state=open]:sm:slide-in-from-top-full"
})

const ToastInner = styled("div", {
  base: "grid gap-1 bg-holo-400 p-20 w-full h-full"
})

const ToastContent = styled(RadixToast.Description, {
  base: "text-sm opacity-90"
})
