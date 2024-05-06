# FediInjectionProvider

Initializes and provides `webln`, `nostr`, and `fedi` APIs from the `window` object.
Provides `nostrPubKey`, `activeFederation`, and `authenticatedMember` if all the APIs load correctly.
Additionally, provides `status`, `isLoading`, and `error` for failure handling.

The methods/properties in the `webln`, `nostr`, and `fedi` APIs are documented in [api.md](../api.md)

## Usage

### 1. Add to Layout

Wrap your application with the `FediInjectionProvider` component.

```tsx
import { FediInjectionProvider } from "@fedibtc/ui"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <FediInjectionProvider>{children}</FediInjectionProvider>
}
```

### 2. Show loading/success/error states

```tsx
import { useFediInjectionContext } from "@fedibtc/ui"

function NostrFallback() {
  const { isLoading, error, status } = useFediInjectionContext()

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
        <p>Status: {status}</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h2>An Error Occurred</h2>
        <p>{error.message}</p>
      </div>
    )
  }

  return <Page />
}
```

### 3. Use `useFediInjection` hook

```tsx
import { useFediInjection } from "@fedibtc/ui"

export default function Page() {
  const {
    authenticatedMember,
    nostrPubkey,
    activeFederation,
    webln,
    nostr,
    fedi
  } = useFediInjection()

  const handleMakeInvoice = async () => {
    const invoice = await webln.makeInvoice({ amount: 10 })
  }

  const handleSignNostrEvent = async () => {
    const unsignedEvent = {
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      tags: [],
      content: "This is a test event",
      pubkey: nostrPubkey
    }

    const event = {
      ...unsignedEvent,
      id: getEventHash(unsignedEvent)
    }

    const signedEvent = await nostr.signEvent(event)
  }

  const handleGenerateEcash = async () => {
    const notes = await fedi.generateEcash({ amount: 10 })
  }

  return (
    <div>
      <ul>
        <li>Hi, {authenticatedMember.username}</li>
        <li>Your Nostr Public Key is {nostrPubKey}</li>
        <li>You are currently in the {activeFederation.name} federation</li>
      </ul>
      <button onClick={handleMakeInvoice}>Make Invoice</button>
      <button onClick={handleSignNostrEvent}>Sign Nostr Event</button>
      <button onClick={handleGenerateEcash}>Generate Ecash Notes</button>
    </div>
  )
}
```

### Props

| Name                   | Type            | Description                                                                 |
| ---------------------- | --------------- | --------------------------------------------------------------------------- |
| children               | React.ReactNode | Child React nodes                                                           |
| fediModName            | string          | The name of the Fedi Mod. Useful for throwing errors                        |
| minSupportedAPIVersion | FediAPIVersion  | The Minimum Fedi API version required by the Fedi Mod. Defaults to `legacy` |

## Hooks

### useNostrContext

Returnes the value of `InjectionProviderContext`. Throws an error if not used within a FediInjectionProvider.

#### Signature

```ts
import type {
  ActiveFederationResponse,
  AuthenticatedMemberResponse,
  InjectionFediAPIProvider,
  InjectionNostrProvider,
  InjectionWebLNProvider,
  SupportedCurrency
} from "@fedibtc/ui"

declare function useFediInjectionContext(): {
  isLoading: boolean
  status:
    | "error"
    | "success"
    | "checking_injections"
    | "loading_webln"
    | "loading_nostr"
    | "loading_fedi_api"
  error: Error | null
  webln: InjectionWebLNProvider | null
  nostr: InjectionNostrProvider | null
  fedi: InjectionFediAPIProvider | null
  nostrPubkey: string | null
  activeFederation: ActiveFederationResponse | null
  authenticatedMember: AuthenticatedMemberResponse | null
  currencyCode: SupportedCurrency | null
  languageCode: string | null
}
```

### useNostr

Returns the value of `InjectionProviderSuccess` (success state). Requires FediInjectionProvider to have been initialized successfully or throws an error.

#### Signature

```ts
import type {
  ActiveFederationResponse,
  AuthenticatedMemberResponse,
  InjectionFediAPIProvider,
  InjectionNostrProvider,
  InjectionWebLNProvider,
  SupportedCurrency
} from "@fedibtc/ui"

declare function useFediInjection(): {
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
```
