# ToastProvider

Provides the state for toast messages and displays them.

## Usage

### 1. Add to Layout

Wrap your application with the `ToastProvider` component.

```tsx
import { ToastProvider } from "@fedibtc/ui"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
```

### 2. Use the `useToast` hook

```tsx
import { useToast, Button } from "@fedibtc/ui"

export default function Page() {
  const toast = useToast()

  return (
    <Button
      onClick={() => toast.show({ content: "I am a toast", status: "success" })}
    >
      Show Toast
    </Button>
  )
}
```

### useToast examples

#### Show a success toast

```tsx
toast.show({
  content: "Success toast",
  status: "success"
})
```

#### Show an error toast

##### With a string

```tsx
toast.show({
  content: "Error toast",
  status: "error"
})
```

##### Formatted error

```tsx
try {
  throw new Error("This is an error")
} catch (error) {
  // The default error message defaults to "An unknown error occurred"
  toast.error(error, "An error occurred")
}
```

#### Show an info toast

```tsx
toast.show({
  content: "Info toast"
  // status is "info" by default and can be passed optionally
  // status: "info"
})
```

## Reference

### ToastProvider

Provides the state for toast messages and displays them.

#### Props

| Name     | Type            | Description       |
| -------- | --------------- | ----------------- |
| children | React.ReactNode | Child React nodes |

#### Signature

```tsx
declare function ToastProvider({
  children
}: {
  children: React.ReactNode
}): JSX.Element
```

### useToast

Returns the current `toast` (or null), and functions to show and hide the current toast.

#### Signature

```tsx
declare function useToast(): {
  toast: Toast | null
  show: (toast: string | ShowToastArgs) => void
  error: (error: unknown, defaultMessage?: string) => void
  close: () => void
}

interface ShowToastArgs {
  content: string
  status?: "success" | "error" | "info"
}
```
