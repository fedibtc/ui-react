"use client"

import * as Icons from "@tabler/icons-react"
import { TablerIconsProps } from "@tabler/icons-react"
import React from "react"

export type IconKey = Exclude<keyof typeof Icons, "createReactComponent">

export interface IconProps extends TablerIconsProps {
  /**
   * The icon to render.
   */
  icon: IconKey
  /**
   * The size of the icon. Must be one of "xxs", "xs", "sm", "md", "lg", "xl", or a number in pixels.
   * @default "xs"
   */
  size?: keyof typeof sizes | number
}

/**
 * Renders an icon component from Tabler Icons.
 */
export function Icon({ icon, size = "xs", ...props }: IconProps) {
  const Comp = Icons[icon]

  return (
    <Comp size={typeof size === "number" ? size : sizes[size]} {...props} />
  )
}

const sizes = {
  xxs: 12,
  xs: 16,
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64
}
