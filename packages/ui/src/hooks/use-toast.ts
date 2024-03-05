"use client"

import React from "react"
import { formatError } from "../lib/errors"

export interface Toast {
  key?: string
  content: string
  status?: ToastStatus
}

export type ToastStatus = "success" | "error" | "info"

export const ToastContext = React.createContext<{
  toast: Toast | null
  setToast: React.Dispatch<React.SetStateAction<Toast | null>>
}>({ toast: null, setToast: () => {} })

export function useToast() {
  const { toast, setToast } = React.useContext(ToastContext)

  const close = () => {
    setToast(null)
  }

  const show = (args: string | Omit<Toast, "key">) => {
    const toastArgs: Required<Toast> = {
      key: Date.now().toString(),
      content: typeof args === "string" ? args : args.content,
      status: "info",
      ...((typeof args === "object" && args) || {})
    }

    setToast(toastArgs)
  }

  const error = (
    error: unknown,
    defaultMessage = "An unknown error occurred"
  ) => {
    show({
      content: formatError(error) || defaultMessage,
      status: "error"
    })
  }

  return {
    toast,
    close,
    show,
    error
  }
}
