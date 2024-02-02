"use client"

import { Icon, IconKey } from "./icon"
import * as RadixAvatar from "@radix-ui/react-avatar"
import React from "react"
import { styled } from "react-tailwind-variants"
import { getIdentityColors } from "../lib/colors"
import stringUtils from "../lib/StringUtils"

export interface AvatarProps {
  /**
   * A unique identifier from which is determined the fallback background color.
   */
  id: string
  /**
   * An image source URL.
   */
  src?: string
  /**
   * A name to generate the first initial for the fallback.
   */
  name?: string
  /**
   * An icon to use as a fallback.
   */
  icon?: IconKey
  /**
   * The size of the avatar. Must be one of "xs", "sm", "md", or "lg".
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg"
  /**
   * The shape of the avatar. Must be one of "circle" or "square".
   * @default "circle"
   */
  shape?: "circle" | "square"
  /**
   * Whether to use the Fedi holo background as a fallback color.
   */
  holo?: boolean
  /**
   * Additional class names to apply to the root element.
   */
  className?: string
}

const iconSizes = { lg: "md", md: "sm", sm: "xs", xs: "xxs" } as const

/**
 * An Avatar component. Includes a fallback or holo background option.
 */
export function Avatar({
  id,
  src,
  name,
  icon,
  size = "md",
  shape = "circle",
  holo,
  className,
  ...props
}: AvatarProps) {
  const [bgColor, textColor] = getIdentityColors(id)
  const [isFallback, setIsFallback] = React.useState(!src)

  return (
    <Root
      size={size}
      shape={shape}
      className={className}
      holo={holo}
      style={{
        backgroundColor: isFallback
          ? holo
            ? undefined
            : bgColor
          : "transparent"
      }}
      {...props}
    >
      {src && (
        <Image
          src={src}
          alt=""
          onLoadingStatusChange={status => setIsFallback(status === "error")}
        />
      )}
      {name && isFallback && (
        <Fallback className={holo ? "text-primary" : `text-[${textColor}`}>
          {icon ? (
            <Icon icon={icon} size={iconSizes[size]} />
          ) : (
            stringUtils.getInitialsFromName(name)
          )}
        </Fallback>
      )}
    </Root>
  )
}

const Root = styled(RadixAvatar.Root, {
  base: "relative inline-flex justify-center items-center overflow-hidden bg-[var(--bg-color)]",
  variants: {
    size: {
      xs: "w-20 h-20 text-[8px]",
      sm: "w-[32px] h-[32px] text-tiny",
      md: "w-xxl h-xxl text-body",
      lg: "w-[88px] h-[88px] text-h2"
    },
    shape: {
      circle: "rounded-full",
      square: "rounded"
    },
    holo: {
      true: "bg-holo-600"
    }
  },
  compoundVariants: [
    {
      variants: {
        size: "sm",
        shape: "square"
      },
      className: "rounded"
    },
    {
      variants: {
        size: "md",
        shape: "square"
      },
      className: "rounded-md"
    },
    {
      variants: {
        size: "lg",
        shape: "square"
      },
      className: "rounded-lg"
    }
  ],
  defaultVariants: {
    size: "md",
    shape: "circle"
  }
})

const Image = styled(RadixAvatar.Image, { base: "w-full h-full object-cover" })

const Fallback = styled("span", {
  base: "flex items-center justify-center pointer-events-none user-select-none"
})
