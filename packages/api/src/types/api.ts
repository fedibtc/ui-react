import { fediApiVersion } from "../utils/constants"
import { SupportedCurrency } from "./currency"

export type FediAPIVersion = (typeof fediApiVersion)[number]

export interface FediAPIV0 {
  version: 0
  generateEcash(args: {
    amount?: string | number
    defaultAmount?: string | number
    minimumAmount?: string | number
    maximumAmount?: string | number
  }): Promise<string>
  receiveEcash(notes: string): Promise<{ msats: number }>
  getActiveFederation(): Promise<{
    id: string
    name: string
    network: "signet" | "bitcoin"
  }>
  getAuthenticatedMember(): Promise<{
    id: string
    username: string
  }>
  getCurrencyCode: () => Promise<SupportedCurrency>
  getLanguageCode: () => Promise<string>
}

// ! Do not update
/** The legacy Fedi API Version before the `version` number was introduced */
export interface FediAPILegacy {
  version: undefined
  generateEcash?: FediAPIV0["generateEcash"]
  receiveEcash?: FediAPIV0["receiveEcash"]
  getActiveFederation?: FediAPIV0["getActiveFederation"]
  getAuthenticatedMember?: FediAPIV0["getAuthenticatedMember"]
  getCurrencyCode?: FediAPIV0["getCurrencyCode"]
  getLanguageCode?: FediAPIV0["getLanguageCode"]
}

export type FediAPILatest = FediAPIV0

export type InjectionFediAPIProvider = FediAPILegacy | FediAPIV0
