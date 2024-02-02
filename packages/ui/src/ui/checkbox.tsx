"use client"

import { Icon } from "./icon"
import { Text } from "./text"
import * as RadixCheckbox from "@radix-ui/react-checkbox"
import * as RadixLabel from "@radix-ui/react-label"
import React from "react"
import { styled } from "react-tailwind-variants"

export interface CheckboxProps {
  /**
   * Whether the checkbox is checked.
   */
  checked: boolean
  /**
   * Whether the checkbox is checked by default. Applies only when uncontrolled.
   * @default false
   */
  defaultChecked?: boolean
  /**
   * Whether the checkbox is disabled.
   */
  disabled?: boolean
  /**
   * A label to display next to the checkbox.
   */
  label?: React.ReactNode
  /**
   * Additional props to apply to the label text.
   */
  labelTextProps?: React.ComponentProps<typeof Text>
  /**
   * A function that is called when the checkbox is changed.
   */
  onChange?: (checked: boolean) => void
}

/**
 * An individual Checkbox component.
 */
export function Checkbox({
  label,
  onChange,
  labelTextProps,
  ...props
}: CheckboxProps) {
  return (
    <Root disabled={props.disabled}>
      <CheckboxRoot {...props} onCheckedChange={onChange}>
        <CheckboxIndicator>
          <Icon size="xs" icon="IconCheck" />
        </CheckboxIndicator>
      </CheckboxRoot>
      {label && (
        <Label disabled={props.disabled}>
          <Text variant="caption" weight="medium" {...labelTextProps}>
            {label}
          </Text>
        </Label>
      )}
    </Root>
  )
}

const Root = styled(RadixLabel.Label, {
  base: "flex items-center gap-[10px] cursor-pointer",
  variants: {
    disabled: {
      true: "cursor-not-allowed"
    }
  }
})

export const CheckboxRoot = styled(RadixCheckbox.Root, {
  base: "relative inline-flex justify-center items-center shrink-0 w-[22px] h-[22px] p-0 bg-white border-solid border-2 border-primary rounded cursor-pointer data-[state=checked]:bg-primary data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed"
})

const CheckboxIndicator = styled(RadixCheckbox.Indicator, {
  base: "block w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 data-[state=checked]:opacity-100"
})

const Label = styled("div", {
  base: "grow",
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed"
    }
  }
})
