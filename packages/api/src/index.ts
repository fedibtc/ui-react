import {
  InjectionFediAPIProvider,
  InjectionNostrProvider,
  InjectionWebLNProvider
} from "./types"

declare global {
  interface Window {
    fediInternal?: InjectionFediAPIProvider
    nostr?: InjectionNostrProvider
    webln?: InjectionWebLNProvider
  }
}

export * from "./types"
