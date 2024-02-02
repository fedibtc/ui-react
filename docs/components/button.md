# Button

A Button.

## Usage

```tsx
import { Button } from "@fedibtc/ui"

function MyComponent() {
  return (
    <div>
      <Button>Click me</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary" size="sm">
        Secondary, small
      </Button>
      <Button variant="tertieary" size="xs">
        Tertiary, extra small
      </Button>
    </div>
  )
}
```

## Props

| Name    | Type                                                | Description                                                                                                        |
| ------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| href    | string                                              | The URL to navigate to when clicked. Converts the button to an anchor element, always opens the link in a new tab. |
| icon    | IconKey                                             | An icon to display before the button text.                                                                         |
| variant | "primary" \| "secondary" \| "tertiary" \| "outline" | The variant of the button. Must be one of "primary", "secondary", "tertiary", or "outline".                        |
| size    | "md" \| "sm" \| "xs"                                | The size of the button. Must be one of "md", "sm", or "xs".                                                        |
| width   | "auto" \| "full"                                    | The width of the button. Must be one of "auto" or "full".                                                          |
| loading | boolean                                             | Whether the button is in a loading state.                                                                          |
