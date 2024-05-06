import { InjectionFediAPIProvider } from "./api"
import { InjectionNostrProvider } from "./nostr"
import { InjectionWebLNProvider } from "./webln"

declare global {
  interface Window {
    fediInternal?: InjectionFediAPIProvider
    nostr?: InjectionNostrProvider
    webln?: InjectionWebLNProvider
  }
}

export * from "./api"
export * from "./nostr"
export * from "./webln"
export * from "./currency"
