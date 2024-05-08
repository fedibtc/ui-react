# Input

Renders an Icon from [Tabler Icons](https://tabler.io/icons) by icon name.

## Usage

```tsx
import { Icon } from "@fedibtc/ui"

function MyComponent() {
  return (
    <button>
      <Icon name="IconX" />
    </button>
  )
}
```

## Custom Props

Excluding default props from `TablerIconsProps`

| Name | Type                                                      | Description                                              |
| ---- | --------------------------------------------------------- | -------------------------------------------------------- |
| icon | `IconKey`                                                 | Key of the icon to render                                |
| size | `"xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| number` | An additional element to display at the end of the input |
