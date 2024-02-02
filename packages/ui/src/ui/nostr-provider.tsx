"use client"

import React from "react"
import { Event } from "nostr-tools"

declare global {
  interface Window {
    nostr?: {
      getPublicKey: () => Promise<string>
      signEvent: (event: Omit<Event, "sig">) => Promise<Event>
    }
  }
}

interface NostrReturn {
  /**
   * The user's public key
   */
  pubkey: string
  /**
   * Signs a Nostr event
   */
  signEvent: (event: Omit<Event, "sig">) => Promise<Event>
}

interface NostrPending {
  nostr: undefined
  isLoading: true
  error: null
}

interface NostrErrorResult {
  nostr: undefined
  isLoading: false
  error: Error
}

interface NostrSuccessResult {
  nostr: NostrReturn
  isLoading: false
  error: null
}

type NostrProviderType = NostrPending | NostrErrorResult | NostrSuccessResult

export const NostrContext = React.createContext<NostrProviderType | null>(null)

/**
 * Connects to `window.nostr`, exposes the user's `pubkey` and a `signEvent` function to sign Nostr events.
 */
export function NostrProvider({ children }: { children: React.ReactNode }) {
  const [nostr, setNostr] = React.useState<NostrReturn | undefined>(undefined)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    async function init() {
      try {
        if (typeof window.nostr === "undefined")
          throw new Error(
            "A Nostr Provider is required to use this application"
          )

        const pubkey = await window.nostr.getPublicKey()

        if (!pubkey) throw new Error("Could not derive public key")

        if (!window.nostr?.signEvent)
          throw new Error("Could not derive window.nostr.signEvent")

        setNostr({
          pubkey,
          signEvent: evt => window.nostr!.signEvent(evt)
        })
      } catch (e) {
        setError(e as Error)
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [])

  return (
    <NostrContext.Provider
      value={
        {
          nostr,
          isLoading,
          error
        } as NostrProviderType
      }
    >
      {children}
    </NostrContext.Provider>
  )
}

/**
 * Returnes the value of `NostrContext`.
 * Throws an error if not used within a NostrProvider.
 */
export function useNostrContext(): NostrProviderType {
  const res = React.useContext(NostrContext)

  if (res === null) {
    throw new Error("useNDKContext must be used within a NostrProvider")
  }

  return res
}

/**
 * Returns the value of `NostrContext.nostr` directly.
 * Requires NostrProvider to have been initialized successfully or throws an error.
 */
export function useNostr() {
  const res = useNostrContext()

  if (typeof res.nostr === "undefined") {
    throw new Error("Nostr provider is not connected")
  }

  return res.nostr
}
