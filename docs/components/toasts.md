# Toasts

A toast component.

## Toaster

Displays toasts. Should be placed at the root of the app.

### Usage

```tsx
import { Toaster } from "@fedibtc/ui"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  )
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
    <Button onClick={() => toast({ content: "I am a toast" })}>
      Show Toast
    </Button>
  )
}
```
