# NostrProvider

**Deprecated**: Removed in `@fedibtc/ui 1.2.0`

Connects to `window.nostr`, exposes the user's `pubkey` and a `signEvent` function to sign Nostr events.

## Usage

### 1. Add to Layout

Wrap your application with the `NostrProvider` component.

```tsx
import { NostrProvider } from "@fedibtc/ui"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <NostrProvider>{children}</NostrProvider>
}
```

### 2. Show loading/success/error states

```tsx
import { useNostrContext } from "@fedibtc/ui"

function NostrFallback() {
  const { isLoading, error } = useNostrContext()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return <Page />
}
```

### 3. Use `useNostr` hook

```tsx
import { useNostr } from "@fedibtc/ui"

export default function Page() {
  const { pubkey } = useNostr()

  return <span>Your Nostr Pubkey is {pubkey}</span>
}
```

## Reference

### NostrProvider

Connects to `window.nostr`, exposes the user's `pubkey` and a `signEvent` function to sign Nostr events.

#### Props

| Name     | Type            | Description       |
| -------- | --------------- | ----------------- |
| children | React.ReactNode | Child React nodes |

#### Signature

```tsx
declare function NostrProvider({
  children
}: {
  children: React.ReactNode
}): JSX.Element
```

### useNostrContext

Returnes the value of `NostrContext`. Throws an error if not used within a NostrProvider.

#### Signature

```tsx
declare function useNostrContext(): {
  nostr: NostrReturn | undefined
  isLoading: boolean
  error: Error | null
}

interface NostrReturn {
  pubkey: string
  signEvent: (event: Omit<Event, "sig">) => Promise<Event>
}
```

### useNostr

Returns the value of `NostrContext.nostr` directly. Requires NostrProvider to have been initialized successfully or throws an error.

#### Signature

```tsx
declare function useNostr(): NostrReturn

interface NostrReturn {
  pubkey: string
  signEvent: (event: Omit<Event, "sig">) => Promise<Event>
}
```

### NostrContext

The pure React Context object used by `NostrProvider`.

#### Type

```tsx
declare const NostrContext: React.Context<{
  webln: NostrReturn | undefined
  isLoading: boolean
  error: Error | null
} | null>
```
