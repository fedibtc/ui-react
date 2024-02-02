# Avatar

An Avatar component. Includes a fallback or holo background option.

## Usage

```tsx
import { Avatar } from "@fedibtc/ui"

function MyComponent() {
  return (
    <div>
      {/* Avatar with valid image */}
      <Avatar id="one" src="image1.png" name="John Doe" />

      {/* Avatar with invalid image. Falls back to a colored background and initial */}
      <Avatar
        id="two"
        src="invalid-image.png"
        name="John"
        size="md"
        shape="square"
      />

      {/* An avatar with an icon and holo background */}
      <Avatar id="two" name="IconUser" icon="IconSocial" holo />
    </div>
  )
}
```

## Props

| Name      | Type    | Description                                                                        |
| --------- | ------- | ---------------------------------------------------------------------------------- |
| id        | string  | A unique identifier from which is determined the fallback background color.        |
| src       | string  | An image source URL.                                                               |
| name      | string  | A name to generate the first initial for the fallback.                             |
| icon      | Icon    | An icon to use as a fallback.                                                      |
| size      | string  | The size of the avatar. Must be one of "xs", "sm", "md", or "lg". Defaults to "md" |
| shape     | string  | The shape of the avatar. Must be one of "circle" or "square". Defaults to "circle" |
| holo      | boolean | Whether to use the Fedi holo background as a fallback color.                       |
| className | string  | Additional class names to apply to the root element.                               |
