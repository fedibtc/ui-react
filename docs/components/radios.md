# RadioGroup

A group of radio buttons.

## Usage

```tsx
import { RadioGroup } from "@fedibtc/ui"
import { useState } from "react"

function MyComponent() {
  const [radioGroupValue, setRadioGroupValue] = useState("one")

  const groupOptions = [
    {
      label: "Group option one",
      value: "one"
    },
    {
      label: "Group option two",
      value: "two"
    },
    {
      label: "Group option three",
      value: "three",
      disabled: true
    }
  ]

  return (
    <div>
      <RadioGroup
        options={groupOptions}
        value={radioGroupValue}
        onChange={setRadioGroupValue}
      />
    </div>
  )
}
```

## Props

| Name           | Type                    | Description                                                                 |
| -------------- | ----------------------- | --------------------------------------------------------------------------- |
| options        | readonly RadioOption[]  | An array of radio options                                                   |
| value          | string                  | The value of the Radio Group. Must match an enumerated `value` in `options` |
| disabled       | boolean                 | Whether the group is disabled                                               |
| labelTextProps | TextProps               | Additional props to apply to the label text.                                |
| onChange       | (value: string) => void | A function that is called when the radio group value is changed             |

## Types

### RadioOption

```tsx
export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}
```
