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

export interface FediAPIV1 extends Omit<FediAPIV0, "version"> {
  version: 1
  getInstalledFediMods: () => Promise<{ url: string }[]>
  installFediMod: (mod: InstallFediModArgs) => Promise<void>
}

export interface FediAPIV2 extends Omit<FediAPIV1, "version"> {
  version: 2
  listCreatedCommunities: () => Promise<{
    communities: RpcCommunity[]
  }>
  createCommunity(community: CreateCommunityRequest): Promise<
    | { success: true; inviteCode: string }
    | {
        success: false
        errors: Record<string, string[] | undefined>
      }
  >
  joinCommunity(inviteCode: string): Promise<
    | { success: true; community: RpcCommunity }
    | {
        success: false
        errors: Record<string, string[] | undefined>
      }
  >
  refreshCommunities(): Promise<void>
  setSelectedCommunity(communityId: string): Promise<
    | { success: true }
    | {
        success: false
        errors: Record<string, string[] | undefined>
      }
  >
  editCommunity(editCommunityRequest: EditCommunityRequest): Promise<
    | { success: true }
    | {
        success: false
        errors: Record<string, string[] | undefined>
      }
  >
  selectPublicChats(): Promise<Array<string>>
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

export type RpcCommunity = {
  communityInvite: RpcCommunityInvite
  name: string
  meta: { [key in string]?: string }
}

export type RpcNostrPubkey = { hex: string; npub: string }

export type RpcCommunityInvite =
  // a created community with this tool will never be a legacy one
  // | { type: "legacy"; invite_code_str: string; community_meta_url: string }
  {
    type: "nostr"
    invite_code_str: string
    author_pubkey: RpcNostrPubkey
    community_uuid_hex: string
  }

export type CreateCommunityRequest = {
  welcome_message?: string
  name: string
  tos_url?: string
  federation_icon_url?: string
  invite_codes_disabled?: "true" | "false"
  new_members_disabled?: "true" | "false"
  preview_message?: string
  pinned_message?: string
  // Will get stringified before passing to the bridge
  default_group_chats?: string[]
  // Will get stringified before passing to the bridge
  fedimods?: {
    id: string
    title: string
    url: string
    imageUrl: string
  }[]
}

export type EditCommunityRequest = {
  communityId: string
  editedCommunity: CreateCommunityRequest
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

export interface InstallFediModArgs {
  title: string
  id: string
  url: string,
  iconUrl: string,
  description: string,
}

export type BitcoinNetwork = "signet" | "bitcoin"

export type FediAPILatest = FediAPIV2

export type InjectionFediAPIProvider = FediAPILegacy | FediAPIV0 | FediAPIV1 | FediAPIV2
