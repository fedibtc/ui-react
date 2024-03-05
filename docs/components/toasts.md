# Toasts

A toast component.

## ToastProvider

Provides the state for toast messages and displays them. Should be placed at the root of the app.

### Usage

```tsx
import { ToastProvider } from "@fedibtc/ui"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
```

## useToast

A hook used to display toasts

### Usage

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
