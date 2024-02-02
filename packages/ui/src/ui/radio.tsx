"use client"

import { Text } from "./text"
import * as RadixRadio from "@radix-ui/react-radio-group"
import React from "react"
import { styled } from "react-tailwind-variants"

type TextProps = React.ComponentProps<typeof Text>

interface RadioOption<T extends string> {
  /**
   * The label to display next to the radio button.
   */
  label: React.ReactNode
  /**
   * The value of the radio button.
   */
  value: T
  /**
   * Whether the radio option is disabled.
   */
  disabled?: boolean
}

export interface RadioGroupProps<T extends string> {
  /**
   * An array of radio options
   */
  options: readonly RadioOption<T>[]
  /**
   * The value of the Radio Group. Must match an enumerated `value` in `options`
   */
  value: T | undefined
  /**
   * Whether the group is disabled
   */
  disabled?: boolean
  /**
   * Additional props to apply to the label text.
   */
  labelTextProps?: TextProps
  /**
   * A function that is called when the radio group value is changed
   */
  onChange(value: T): void
}

/**
 * A group of Radio Buttons.
 */
export function RadioGroup<T extends string>({
  options,
  onChange,
  labelTextProps,
  ...props
}: RadioGroupProps<T>): React.ReactElement {
  return (
    <Root onValueChange={onChange} {...props}>
      {options.map(({ value, label, disabled }) => (
        <Item key={value} disabled={props.disabled || disabled}>
          <Radio
            value={value}
            checked={props.value === value}
            disabled={props.disabled || disabled}
          >
            <RadioIndicator />
          </Radio>
          <Label disabled={props.disabled || disabled}>
            <Text variant="caption" weight="medium" {...labelTextProps}>
              {label}
            </Text>
          </Label>
        </Item>
      ))}
    </Root>
  )
}

const Root = styled(RadixRadio.Root, { base: "flex flex-col gap-[10px]" })

const Item = styled("label", {
  base: "flex items-center gap-[10px] cursor-pointer",
  variants: {
    disabled: {
      true: "cursor-not-allowed"
    }
  }
})

const Radio = styled(RadixRadio.Item, {
  base: "relative inline-flex items-center justify-center p-0 w-[22px] h-[22px] bg-white border-2 border-solid border-primary rounded-full cursor-pointer disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:cursor-not-allowed disabled:cursor-not-allowed"
})

const RadioIndicator = styled(RadixRadio.Indicator, {
  base: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full data-[state=checked]:bg-primary"
})

const Label = styled("div", {
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed"
    }
  }
})
