# Text

Consistent typography text node.

## Usage

```tsx
import { Text } from "@fedibtc/ui"

function MyComponent() {
  return (
    <div>
      <Text variant="display">Display</Text>
      <Text variant="h1">Header 1</Text>
      <Text variant="h2">Header 2</Text>
      <Text weight="medium">Normal Text, medium</Text>
      <Text variant="caption" weight="bold">
        Caption, bold
      </Text>
      <Text variant="small" weight="bolder">
        Small, bolder
      </Text>
      <Text variant="tiny">Super small</Text>
    </div>
  )
}
```

## Custom Props

Excluding default props from `React.HTMLAttributes<HTMLDivElement>`

| Name      | Type                                                                  | Description                                                                                           |
| --------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| variant   | "display" \| "h1" \| "h2" \| "body" \| "caption" \| "small" \| "tiny" | The variant of the text. Must be one of "display", "h1", "h2", "body", "caption", "small", or "tiny". |
| weight    | "normal" \| "medium" \| "bold" \| "bolder"                            | The weight of the text. Must be one of "normal", "medium", "bold", or "bolder".                       |
| ellipsize | boolean                                                               | Whether the text should be truncated with an ellipsis.                                                |
