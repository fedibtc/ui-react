"use client"

import React from "react"
import { InjectionWebLNProvider } from "@fedibtc/api"

interface WebLNPending {
  webln: undefined
  isLoading: true
  error: null
}

interface WebLNErrorResult {
  webln: undefined
  isLoading: false
  error: Error
}

interface WebLNSuccessResult {
  webln: InjectionWebLNProvider
  isLoading: false
  error: null
}

export type WebLNProviderType =
  | WebLNPending
  | WebLNErrorResult
  | WebLNSuccessResult

export const WebLNContext = React.createContext<WebLNProviderType | null>(null)

/**
 * Connects to `window.webln`, enabling and exposing `webln` through `WebLNContext`.
 */
export function WebLNProvider({ children }: { children: React.ReactNode }) {
  const [webln, setWebln] = React.useState<InjectionWebLNProvider | undefined>(
    undefined
  )
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    async function init() {
      try {
        if (typeof window.webln === "undefined") {
          throw new Error(
            "A WebLN Provider is required in order to use this application"
          )
        }

        await window.webln.enable()

        if ("isEnabled" in window.webln && window.webln.isEnabled) {
          setWebln(window.webln)
        } else {
          throw new Error("Could not enable WebLN Provider")
        }
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }
    init()
  }, [])

  return (
    <WebLNContext.Provider
      value={
        {
          webln,
          isLoading,
          error
        } as WebLNProviderType
      }
    >
      {children}
    </WebLNContext.Provider>
  )
}

/**
 * Returnes the value of `WebLNContext`.
 * Throws an error if not used within a WebLNProvider.
 */
export function useWebLNContext(): WebLNProviderType {
  const res = React.useContext(WebLNContext)

  if (res === null) {
    throw new Error("useWebLNContext must be used within a WebLNProvider")
  }

  return res
}

/**
 * Returns `WebLNProvider.webln` directly.
 * Requires WebLNProvider to have been initialized successfully or throws an error.
 */
export function useWebLN(): InjectionWebLNProvider {
  const res = useWebLNContext()

  if (typeof res.webln === "undefined") {
    throw new Error("WebLN provider is not connected")
  }

  return res.webln
}
