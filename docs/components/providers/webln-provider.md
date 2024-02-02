# WebLNProvider

Enables and exposes `window.webln` through the `useWebLNContext`/`useWebLN` hooks provided by `WebLNContext`

## Usage

### 1. Add to Layout

Wrap your application with the `WebLNProvider` component.

```tsx
import { WebLNProvider } from "@fedibtc/ui"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <WebLNProvider>{children}</WebLNProvider>
}
```

### 2. Show loading/success/error states

```tsx
import { useWebLNContext } from "@fedibtc/ui"

function WebLNFallback() {
  const { isLoading, error } = useWebLNContext()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return <Page />
}
```

### 3. Use `useWebLN` hook

```tsx
import { useWebLN } from "@fedibtc/ui"

export default function Page() {
  const webln = useWebLN()

  const payInvoice = async (paymentRequest: string) => {
    try {
      await webln.sendPayment(invoice)
    } catch (e) {
      console.error(e)
    }
  }

  return <button onClick={() => payInvoice("lnbc...")}>Pay Invoice</button>
}
```

## Reference

### WebLNProvider

Enables and exposes `window.webln` through the `useWebLNContext`/`useWebLN` hooks provided by `WebLNContext`

#### Props

| Name     | Type            | Description       |
| -------- | --------------- | ----------------- |
| children | React.ReactNode | Child React nodes |

#### Signature

```
declare function WebLNProvider({
  children
}: {
  children: React.ReactNode
}): React.JSX.Element
```

### useWebLNContext

Returnes the value of `WebLNContext`. Throws an error if not used within a WebLNProvider.

#### Signature

```tsx
declare function useWebLNContext(): {
  webln: WebLNProvider | undefined
  isLoading: boolean
  error: Error | null
}
```

### useWebLN

Returns `WebLNProvider.webln` directly. Requires WebLNProvider to have been initialized successfully or throws an error.

#### Signature

```tsx
import webbtc from "@webbtc/webln-types"

declare function useWebLN(): webbtc.WebLNProvider
```

### WebLNContext

The pure React Context object used by `WebLNProvider`.

#### Type

```tsx
import webbtc from "@webbtc/webln-types"

declare const WebLNContext: React.Context<{
  webln: webbtc.WebLNProvider | undefined
  isLoading: boolean
  error: Error | null
} | null>
```
