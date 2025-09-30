import React from "react"
import {
  ActiveFederationResponse,
  AuthenticatedMemberResponse,
  BitcoinNetwork,
  FediAPIVersion,
  InjectionFediAPIProvider,
  InjectionNostrProvider,
  InjectionWebLNProvider,
  SupportedCurrency
} from "../types/injection"
import { fediAPIVersion } from "../constants"

export type PendingStatus =
  | "checking_injections"
  | "loading_webln"
  | "loading_nostr"
  | "loading_fedi_api"

export type InjectionStatus = PendingStatus | "error" | "success"

interface FediInjectionPending {
  isLoading: true
  status: PendingStatus
  error: null
  webln: null
  nostr: null
  fedi: null
  nostrPubkey: null
  activeFederation: null
  authenticatedMember: null
  currencyCode: null
  languageCode: null
}

interface FediInjectionError {
  isLoading: false
  status: "error"
  error: Error
  webln: null
  nostr: null
  fedi: null
  nostrPubkey: null
  activeFederation: null
  authenticatedMember: null
  currencyCode: null
  languageCode: null
}

interface FediInjectionSuccess {
  isLoading: false
  status: "success"
  error: null
  webln: InjectionWebLNProvider
  nostr: InjectionNostrProvider
  fedi: InjectionFediAPIProvider
  nostrPubkey: string
  activeFederation: ActiveFederationResponse
  authenticatedMember: AuthenticatedMemberResponse
  currencyCode: SupportedCurrency
  languageCode: string
}

type FediInjectionValue =
  | FediInjectionPending
  | FediInjectionError
  | FediInjectionSuccess

const FediInjectionContext = React.createContext<FediInjectionValue | null>(
  null
)

/**
 * Connects to WebLN, Nostr, and the Fedi API.
 * Loads useful information such as the user's nostr pubkey and the active federation/member info.
 * Provides `webln`, `nostr`, and `fedi` as refs to the corresponding `window` injections.
 */
export function FediInjectionProvider({
  children,
  fediModName,
  minSupportedAPIVersion = "legacy"
}: {
  children: React.ReactNode
  fediModName?: string
  minSupportedAPIVersion?: FediAPIVersion
  supportedBitcoinNetworks?: {
    [K in BitcoinNetwork]?: boolean
  }
}) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [status, setStatus] = React.useState<InjectionStatus>(
    "checking_injections"
  )
  const [error, setError] = React.useState<Error | null>(null)

  const [nostrPubkey, setNostrPubkey] = React.useState<string | null>(null)
  const [authenticatedMember, setAuthenticatedMember] =
    React.useState<AuthenticatedMemberResponse | null>(null)
  const [currencyCode, setCurrencyCode] =
    React.useState<SupportedCurrency | null>(null)
  const [languageCode, setLanguageCode] = React.useState<string | null>(null)

  const weblnRef = React.useRef<InjectionWebLNProvider | null>(null)
  const nostrRef = React.useRef<InjectionNostrProvider | null>(null)
  const fediRef = React.useRef<InjectionFediAPIProvider | null>(null)

  React.useEffect(() => {
    async function initialize() {
      const modName = fediModName ?? "This Fedi mod"
      const injectionError = (injection: string) =>
        new Error(
          `${modName} requires ${injection} to function. Please update the Fedi App and try again`
        )

      try {
        if (!window.webln) throw injectionError("WebLN")
        if (!window.nostr) throw injectionError("Nostr")
        if (!window.fediInternal) throw injectionError("the Fedi API")
        if (
          fediAPIVersion.indexOf(window.fediInternal.version ?? "legacy") <
          fediAPIVersion.indexOf(minSupportedAPIVersion)
        )
          throw new Error("Please update the Fedi App to use " + modName)

        // Enable WebLN
        setStatus("loading_webln")
        try {
          await window.webln.enable()

          if (!window.webln.isEnabled) throw new Error()
        } catch {
          throw new Error("Could not enable WebLN")
        }

        // Load Nostr Pubkey
        setStatus("loading_nostr")
        let nostrPublicKey: string
        try {
          nostrPublicKey = await window.nostr.getPublicKey()
        } catch {
          throw new Error("Could not get Nostr Public Key")
        }

        // Load Fedi Internal
        setStatus("loading_fedi_api")
        let authenticatedMember: AuthenticatedMemberResponse
        let currencyCode: SupportedCurrency
        let languageCode: string
        try {
          const member = await window.fediInternal.getAuthenticatedMember?.()
          const currency = await window.fediInternal.getCurrencyCode?.()
          const language = await window.fediInternal.getLanguageCode?.()

          if (!member) throw new Error()

          authenticatedMember = member
          currencyCode = currency ?? SupportedCurrency.USD
          languageCode = language ?? "en"
        } catch {
          throw new Error(
            "Failed to initialize the Fedi API. Please update the Fedi App and try again."
          )
        }

        // Set all Refs and states
        weblnRef.current = window.webln
        nostrRef.current = window.nostr
        fediRef.current = window.fediInternal
        setNostrPubkey(nostrPublicKey)
        setAuthenticatedMember(authenticatedMember)
        setCurrencyCode(currencyCode)
        setLanguageCode(languageCode)
        setStatus("success")
      } catch (err) {
        setError(err as Error)
        setStatus("error")
      } finally {
        setIsLoading(false)
      }
    }

    initialize()
  }, [])

  return (
    <FediInjectionContext.Provider
      value={
        {
          isLoading,
          status,
          error,
          webln: weblnRef.current,
          nostr: nostrRef.current,
          fedi: fediRef.current,
          nostrPubkey,
          authenticatedMember,
          currencyCode,
          languageCode
        } as FediInjectionValue
      }
    >
      {children}
    </FediInjectionContext.Provider>
  )
}

/**
 * Returnes the value of `InjectionProviderContext`.
 * Throws an error if not used within a FediInjectionProvider.
 */
export function useFediInjectionContext() {
  const value = React.useContext(FediInjectionContext)

  if (value === null)
    throw new Error(
      "useInjectionContext() must be used within a FediInjectionProvider"
    )

  return value
}

/**
 * Returns the value of `InjectionProviderSuccess` (success state).
 * Requires FediInjectionProvider to have been initialized successfully or throws an error.
 */
export function useFediInjection() {
  const value = useFediInjectionContext()

  if (value.status !== "success") {
    throw new Error("Injections were not initialized successfully")
  }

  return value
}
