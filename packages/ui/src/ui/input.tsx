"use client"

import React from "react"
import { Text } from "./text"
import { styled } from "react-tailwind-variants"

interface CustomProps {
  /**
   * The value of the input.
   */
  value: string
  /**
   * A label to display above the input.
   */
  label?: React.ReactNode
  /**
   * A placeholder to display when the input is empty.
   */
  placeholder?: string
  /**
   * Whether the input is disabled.
   */
  disabled?: boolean
  /**
   * Whether the input should take full width.
   * @default "full"
   */
  width?: "auto" | "full"
  /**
   * Whether the input text should overflow or be cut off.
   * @default clip
   */
  textOverflow?: "clip" | "ellipsis"
  /**
   * An additional element to display at the end of the input.
   */
  adornment?: React.ReactNode
}

export type InputProps = CustomProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    keyof CustomProps | "className"
  >

/**
 * A styled <input> element
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, onFocus, onBlur, width = "full", adornment, ...inputProps },
    ref
  ) => {
    const [hasFocus, setHasFocus] = React.useState(false)

    const handleFocus = React.useCallback(
      (ev: React.FocusEvent<HTMLInputElement>) => {
        setHasFocus(true)
        if (onFocus) onFocus(ev)
      },
      [onFocus]
    )

    const handleBlur = React.useCallback(
      (ev: React.FocusEvent<HTMLInputElement>) => {
        setHasFocus(false)
        if (onBlur) onBlur(ev)
      },
      [onBlur]
    )

    return (
      <Container width={width}>
        {label && (
          <Label>
            <Text variant="small">{label}</Text>
          </Label>
        )}
        <InputWrap isFocused={hasFocus} isDisabled={inputProps.disabled}>
          <TextInput
            {...inputProps}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={ref}
          />
          {adornment}
        </InputWrap>
      </Container>
    )
  }
)

const Container = styled("label", {
  base: "inline-flex flex flex-col text-left",
  variants: {
    width: {
      auto: "w-auto",
      full: "w-full"
    }
  }
})

const Label = styled("div", {
  base: "pb-xs pl-[6px]"
})

const InputWrap = styled("div", {
  base: "inline-flex items-center h-xxl bg-white border-2 border-lightGrey rounded-lg transition-[border-color 80ms ease]",
  variants: {
    isFocused: {
      true: "border-night"
    },
    isDisabled: {
      true: "bg-extraLightGrey"
    }
  }
})

const TextInput = styled("input", {
  base: "grow min-w-[60px] h-full p-md border-0 bg-transparent focus:outline-0 active:outline-0 disabled:cursor-not-allowed placeholder:text-grey",
  variants: {
    textOverflow: {
      clip: "text-clip",
      ellipsis: "truncate"
    }
  },
  defaultVariants: {
    textOverflow: "clip"
  }
})
