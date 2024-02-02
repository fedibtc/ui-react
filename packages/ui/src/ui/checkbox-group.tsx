"use client"

import { Checkbox } from "./checkbox"
import React from "react"

type CheckboxProps = React.ComponentProps<typeof Checkbox>

interface CheckboxOption<T extends string>
  extends Omit<CheckboxProps, "onChange" | "checked"> {
  value: T
}

export interface CheckboxGroupProps<T extends string> {
  /**
   * An array of checkbox options
   */
  options: CheckboxOption<T>[]
  /**
   * An array of values of type T that are checked
   */
  values: T[] | undefined
  /**
   * Whether the group is disabled
   */
  disabled?: boolean
  /**
   * A function that is called when one or more `options` are changed
   */
  onChange(values: T[]): void
}

/**
 * A group of Checkboxes
 */
export function CheckboxGroup<T extends string>({
  options,
  values,
  onChange,
  ...props
}: CheckboxGroupProps<T>) {
  const handleChange = React.useCallback(
    (checked: boolean, value: T) => {
      if (checked) {
        onChange([...(values || []), value])
      } else {
        onChange(values?.filter(v => v !== value) || [])
      }
    },
    [values, onChange]
  )

  return (
    <div className="flex flex-col gap-[10px]">
      {options.map(({ value, disabled, ...checkboxProps }) => (
        <Checkbox
          key={value}
          onChange={checked => handleChange(checked, value)}
          checked={!!values?.includes(value)}
          disabled={disabled || props.disabled}
          {...checkboxProps}
        />
      ))}
    </div>
  )
}
