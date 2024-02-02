"use client"

import { variants } from "react-tailwind-variants"
import React from "react"

type TextProps = {
  /**
   * The variant of the text. Must be one of "display", "h1", "h2", "body", "caption", "small", or "tiny".
   * @default "body"
   */
  variant?: "display" | "h1" | "h2" | "body" | "caption" | "small" | "tiny"
  /**
   * The weight of the text. Must be one of "normal", "medium", "bold", or "bolder".
   * @default "normal"
   */
  weight?: "normal" | "medium" | "bold" | "bolder"
  /**
   * Whether the text should be truncated with an ellipsis.
   * @default false
   */
  ellipsize?: boolean
} & React.HTMLAttributes<HTMLDivElement>
/**
 * Text Component with all the typography styles.
 */
const textVariants = variants({
  base: "text-inherit text-body leading-5 tracking-[-1%]",
  variants: {
    variant: {
      display: "font-bolder text-display leading-[1.5]",
      h1: "font-bolder text-h1 leading-[1.5]",
      h2: "font-bolder text-h2 leading-[1.5]",
      body: "text-body",
      caption: "text-caption",
      small: "text-small",
      tiny: "text-tiny"
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
      bolder: "font-bolder"
    },
    ellipsize: {
      true: "truncate"
    }
  },
  defaultVariants: {
    ellipsize: false,
    variant: "body",
    weight: "normal"
  }
})

export function Text({
  variant,
  weight,
  ellipsize,
  className,
  ...props
}: TextProps) {
  return (
    <div
      className={textVariants({
        variant,
        weight,
        ellipsize,
        className
      })}
      {...props}
    />
  )
}
