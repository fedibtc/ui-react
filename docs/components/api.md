# Injection APIs

The injection APIs can be accessed through the global `window` object or via the `useFediInjectionContext`/`useFediInjection` hooks in the React library.

## WebLN

Provides some methods documented in the [WebLN Standard](https://webln.guide)

### Signature

```tsx
import type { InjectionWebLNProvider } from '@fedibtc/ui'

declare global {
  interface Window {
    webln: InjectionWebLNProvider
  }
}

declare function useFediInjection(): {
    ...FediInjectionValue,
    webln: InjectionWebLNProvider
}

declare function useFediInjectionContext(): {
    ...FediInjectionValue,
    webln: InjectionWebLNProvider | null
}
```

## Properties

| Property  | Type    | Description                                                                 |
| --------- | ------- | --------------------------------------------------------------------------- |
| isEnabled | boolean | Whether WebLN has been enabled successfully via the `webln.enable()` method |

## Methods

| Signature                                                                                    | Description                                                                                                                                                               |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enable(): Promise<void>`                                                                    | Enables all the WebLN methods. [[docs]](https://www.webln.guide/building-lightning-apps/webln-reference/webln.enable)                                                     |
| `getInfo(): Promise<GetInfoResponse>`                                                        | Get information about the connected node and what WebLN methods it supports. [[docs]](https://www.webln.guide/building-lightning-apps/webln-reference/webln.getinfo)      |
| `sendPayment(paymentRequest: string): Promise<SendPaymentResponse>`                          | Request that the user sends a payment for an invoice. [[docs]](https://www.webln.guide/building-lightning-apps/webln-reference/webln.sendpayment)                         |
| `keysend(args: KeysendArgs): Promise<SendPaymentResponse>`                                   | Request the user to send a keysend payment. [[docs]](https://www.webln.guide/building-lightning-apps/webln-reference/webln.keysend)                                       |
| `makeInvoice(args: string \| number \| RequestInvoiceArgs): Promise<RequestInvoiceResponse>` | Request that the user creates a Bolt11 invoice. [[docs]](https://www.webln.guide/building-lightning-apps/webln-reference/webln.sendpayment)                               |
| `signMessage(message: string): Promise<SignMessageResponse>`                                 | Requests that the user signs an arbitrary string message. [[docs]](https://www.webln.guide/building-lightning-apps/webln-reference/webln.signmessage)                     |
| `verifyMessage(signature: string, message: string): Promise<void>`                           | Opens a view where the user verifies the signature against the raw message. [[docs]](https://www.webln.guide/building-lightning-apps/webln-reference/webln.verifymessage) |

## Nostr

Provides basic functions to interact with the [Nostr Protocol](https://nostr.com/)

```tsx
import type { InjectionNostrProvider } from '@fedibtc/ui'

declare global {
  interface Window {
    nostr: InjectionNostrProvider
  }
}

declare function useFediInjection(): {
    ...FediInjectionValue,
    webln: InjectionNostrProvider
}

declare function useFediInjectionContext(): {
    ...FediInjectionValue,
    webln: InjectionNostrProvider | null
}
```

### Methods

| Signature                                                         | Description                               |
| ----------------------------------------------------------------- | ----------------------------------------- |
| `getPublicKey(): Promise<string>`                                 | Returns the user's Nostr Public Key       |
| `signEvent(event: UnsignedNostrEvent): Promise<SignedNostrEvent>` | Requests that the user sign a Nostr event |

## Fedi

Provides some functions to interact with the Fedi App

```ts
import type { InjectionFediAPIProvider } from '@fedibtc/ui'

declare global {
  interface Window {
    fediInternal: InjectionFediAPIProvider
  }
}

declare function useFediInjection(): {
    ...FediInjectionValue,
    fedi: InjectionFediAPIProvider
}

declare function useFediInjectionContext(): {
    ...FediInjectionValue,
    fedi: InjectionFediAPIProvider | null
}
```

### Properties

| Property | Type             | Description                                                         |
| -------- | ---------------- | ------------------------------------------------------------------- |
| version  | `0 \| undefined` | The Fedi API version. If undefined, points to the `legacy` version. |

### Methods

| Signature                                                        | Description                                                        | Support    |
| ---------------------------------------------------------------- | ------------------------------------------------------------------ | ---------- |
| `generateEcash(args: GenerateEcashArgs): Promise<string>`        | Generates Ecash notes                                              | `>=legacy` |
| `receiveEcash(notes: string): Promise<{ msats: number }>`        | Claims Ecash notes                                                 | `>=legacy` |
| `getActiveFederation(): Promise<ActiveFederationResponse>`       | Returns the ID, name, and bitcoin network of the active Federation | `>=legacy` |
| `getAuthenticatedMember(): Promise<AuthenticatedMemberResponse>` | Returns the ID and username of the current Fedi member             | `>=legacy` |
| `getCurrencyCode: () => Promise<SupportedCurrency>`              | Returns the user's selected three-letter currency code             | `>=0`      |
| `getLanguageCode: () => Promise<string>`                         | Returns the user's selected two-letter language code               | `>=0`      |
