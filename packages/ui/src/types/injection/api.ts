import { fediAPIVersion } from "../../constants"
import { SupportedCurrency } from "./currency"

export type FediAPIVersion = (typeof fediAPIVersion)[number]

export interface FediAPIV0 {
  version: 0
  generateEcash(args: GenerateEcashArgs): Promise<string>
  receiveEcash(notes: string): Promise<{ msats: number }>
  getAuthenticatedMember(): Promise<AuthenticatedMemberResponse>
  getCurrencyCode: () => Promise<SupportedCurrency>
  getLanguageCode: () => Promise<string>
}

// ! Do not update
/** The legacy Fedi API Version before the `version` number was introduced */
export interface FediAPILegacy {
  version: undefined
  generateEcash?: FediAPIV0["generateEcash"]
  receiveEcash?: FediAPIV0["receiveEcash"]
  getAuthenticatedMember?: FediAPIV0["getAuthenticatedMember"]
  getCurrencyCode?: FediAPIV0["getCurrencyCode"]
  getLanguageCode?: FediAPIV0["getLanguageCode"]
}

export interface AuthenticatedMemberResponse {
  id: string
  username: string
}

export interface ActiveFederationResponse {
  id: string
  name: string
  network: BitcoinNetwork
}

export interface GenerateEcashArgs {
  amount?: string | number
  defaultAmount?: string | number
  minimumAmount?: string | number
  maximumAmount?: string | number
}

export type BitcoinNetwork = "signet" | "bitcoin"

export type FediAPILatest = FediAPIV0

export type InjectionFediAPIProvider = FediAPILegacy | FediAPIV0
