"use client"

import React from "react"
import { styled, variants } from "react-tailwind-variants"
import { Icon, IconKey } from "./icon"
import { twMerge } from "tailwind-merge"

export type BaseButtonProps = {
  /**
   * An icon to display before the button text.
   */
  icon?: IconKey
  /**
   * The variant of the button. Must be one of "primary", "secondary", "tertiary", or "outline".
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "offWhite"
  /**
   * The size of the button. Must be one of "md", "sm", or "xs".
   * @default "md"
   */
  size?: "md" | "sm" | "xs"
  /**
   * The width of the button. Must be one of "auto" or "full".
   * @default "auto"
   */
  width?: "auto" | "full"
  /**
   * Whether the button is in a loading state.
   */
  loading?: boolean
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean
}

type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof BaseButtonProps
> &
  BaseButtonProps

type ButtonLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof BaseButtonProps
> &
  BaseButtonProps & {
    /**
     * The URL to navigate to when clicked. Converts the button to an anchor element, always opens the link in a new tab.
     */
    href: string
  }

/**
 * A pressable and accessible react node used to trigger an action or open a link (a Button).
 */
export function Button({
  loading,
  icon,
  variant = "primary",
  size = "md",
  width = "auto",
  children,
  className,
  ...props
}: ButtonProps | ButtonLinkProps) {
  const content = (
    <>
      <ButtonContent loading={loading}>
        {icon && typeof icon === "string" ? (
          <Icon size="xs" icon={icon} />
        ) : null}
        <div>{children}</div>
      </ButtonContent>
      <ButtonLoader loading={loading}>
        <div className="animate-spin">
          <Icon size="xs" icon="IconLoader2" />
        </div>
      </ButtonLoader>
    </>
  )

  if ("href" in props) {
    return (
      <a
        className={twMerge(
          buttonVariants({
            loading,
            variant,
            size,
            width,
            disabled: props.disabled
          }),
          className
        )}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={twMerge(
        buttonVariants({
          loading,
          variant,
          size,
          width,
          disabled: props.disabled
        }),
        className
      )}
      {...props}
    >
      {content}
    </button>
  )
}

const buttonVariants = variants({
  base: "relative inline-flex justify-center items-center font-medium rounded-[40px] border-0 no-underline decoration-transparent decoration-0 cursor-pointer transition-button disabled:pointer-events-none",
  variants: {
    variant: {
      primary:
        "bg-primary bg-gradient-to-b from-white/20 to-transparent text-white hover:brightness-125 active:brightness-150",
      secondary:
        "bg-white bg-gradient-to-b from-white to-primary/10 shadow-secondary-inset hover:brightness-95 active:brightness-90",
      tertiary:
        "bg-transparent text-primary hover:bg-primary/5 active:bg-primary/10",
      offWhite:
        "bg-offWhite text-primary hover:bg-offWhite/80 active:opacity-50",
      outline:
        "bg-transparent text-primary !border-solid !border-2 !border-primary hover:bg-primary/5 active:bg-primary/10"
    },
    size: {
      md: "h-xxl px-xxl text-sm",
      sm: "h-[32px] px-[26px] text-sm",
      xs: "h-xl px-5 text-xs"
    },
    width: {
      auto: "w-auto",
      full: "w-full"
    },
    disabled: {
      true: "pointer-events-none opacity-50"
    },
    loading: {
      true: ""
    }
  },
  compoundVariants: [
    {
      variants: {
        disabled: true,
        loading: true
      },
      className: "opacity-100"
    }
  ],
  defaultVariants: {
    variant: "primary",
    width: "auto",
    size: "md"
  }
})

const ButtonContent = styled("div", {
  base: "flex items-center gap-2",
  variants: {
    loading: {
      true: "opacity-0"
    }
  }
})

const ButtonLoader = styled("div", {
  base: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0",
  variants: {
    loading: {
      true: "opacity-100"
    }
  }
})
