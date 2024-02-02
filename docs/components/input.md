# Input

An input.

## Usage

```tsx
import { Input } from "@fedibtc/ui"
import { useState } from "react"

function MyComponent() {
  const [value, setValue] = useState("")

  return (
    <div>
      <Input value={value} onChange={e => setValue(e.target.value)} />
    </div>
  )
}
```

## Custom Props

Excluding default props from `React.InputHTMLAttributes<HTMLInputElement>`

| Name         | Type                 | Description                                               |
| ------------ | -------------------- | --------------------------------------------------------- |
| value        | string               | The value of the input.                                   |
| label        | React.ReactNode      | A label to display above the input.                       |
| placeholder  | string               | A placeholder to display when the input is empty.         |
| disabled     | boolean              | Whether the input is disabled.                            |
| width        | "auto" \| "full"     | Whether the input should take full width.                 |
| textOverflow | "clip" \| "ellipsis" | Whether the input text should overflow or be cut off.     |
| adornment    | React.ReactNode      | An additional element to display at the end of the input. |
