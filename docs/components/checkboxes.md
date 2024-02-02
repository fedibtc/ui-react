# Checkbox / CheckboxGroup

## Checkbox

An Individual checkbox component.

### Usage

```tsx
import { Checkbox } from "@fedibtc/ui"
import { useState } from "react"

function MyComponent() {
  const [checked, setChecked] = useState(false)

  return (
    <Checkbox
      checked={checked}
      onChange={setChecked}
      label="I am a single Checkbox"
    />
  )
}
```

### Props

| Name           | Type                              | Description                                                                 |
| -------------- | --------------------------------- | --------------------------------------------------------------------------- |
| checked        | boolean                           | Whether the checkbox is checked.                                            |
| defaultChecked | boolean                           | Whether the checkbox is checked by default. Applies only when uncontrolled. |
| disabled       | boolean                           | Whether the checkbox is disabled.                                           |
| label          | React.ReactNode                   | A label to display next to the checkbox.                                    |
| labelTextProps | React.ComponentProps<typeof Text> | Additional props to apply to the label text.                                |
| onChange       | (checked: boolean) => void        | A function that is called when the checkbox is changed.                     |

## CheckboxGroup

A group of checkboxes.

### Usage

```tsx
import { CheckboxGroup } from "@fedibtc/ui"
import { useState } from "react"

function MyComponent() {
  const [checkboxGroupValues, setCheckboxGroupValues] = useState(["one"])

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
    <CheckboxGroup
      options={groupOptions}
      values={checkboxGroupValues}
      onChange={setCheckboxGroupValues}
    />
  )
}
```

### Props

| Name     | Type                       | Description                                                       |
| -------- | -------------------------- | ----------------------------------------------------------------- |
| options  | CheckboxOption[]           | An array of checkbox options.                                     |
| values   | string[]                   | An array of values of type T that are checked.                    |
| disabled | boolean                    | Whether the group is disabled.                                    |
| onChange | (values: string[]) => void | A function that is called when one or more `options` are changed. |
