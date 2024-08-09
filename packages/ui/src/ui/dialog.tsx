"use client"

import * as RadixDialog from "@radix-ui/react-dialog"
import React from "react"
import { Text } from "./text"
import { Icon } from "./icon"
import { styled } from "react-tailwind-variants"

export interface DialogProps {
  /**
   * Whether the dialog is open or not.
   */
  open: boolean
  /**
   * A callback fired when the dialog is requested to be closed.
   */
  onOpenChange(open: boolean): void
  /**
   * The content of the dialog.
   */
  children: React.ReactNode
  /**
   * The title of the dialog.
   */
  title?: React.ReactNode
  /**
   * The description of the dialog.
   */
  description?: React.ReactNode
  /**
   * The size of the dialog. Must be one of "sm", "md", or "lg".
   * @default "md"
   */
  size?: "sm" | "md" | "lg"
  /**
   * Whether the close button should be disabled (hidden) or not.
   * @default false
   */
  disableClose?: boolean
  /**
   * A className to apply to the dialog content.
   */
  className?: string
}

/**
 * A controlled Dialog component.
 */
export const Dialog = ({
  title,
  description,
  open,
  onOpenChange,
  children,
  size = "md",
  disableClose = false,
  className
}: DialogProps) => {
  const handleCloseTrigger = React.useCallback(
    (e: Event) => {
      if (disableClose) e.preventDefault()
    },
    [disableClose]
  )

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <DialogOverlay>
          <DialogContent
            size={size}
            onOpenAutoFocus={ev => ev.preventDefault()}
            onEscapeKeyDown={handleCloseTrigger}
            onPointerDownOutside={handleCloseTrigger}
            onInteractOutside={handleCloseTrigger}
            className={className}
          >
            {(title || description) && (
              <DialogHeader>
                {title && (
                  <DialogTitle>
                    <Text variant="body" weight="bold">
                      {title}
                    </Text>
                  </DialogTitle>
                )}
                {description && (
                  <DialogDescription>
                    <Text variant="caption" weight="medium">
                      {description}
                    </Text>
                  </DialogDescription>
                )}
              </DialogHeader>
            )}
            {children}
            {!disableClose && (
              <DialogClose>
                <Icon icon="IconX" size="xs" />
              </DialogClose>
            )}
          </DialogContent>
        </DialogOverlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

const DialogClose = styled(RadixDialog.Close, {
  base: "absolute top-lg right-lg p-xs opacity-50 outline-0 cursor-pointer z-[100] hover:opacity-100 focus:opacity-100 sm:top-[18px] sm:right-[18px]"
})

const DialogOverlay = styled(RadixDialog.Overlay, {
  base: "fixed inset-0 grid place-items-center overflow-auto bg-primary/80 sm:p-0 sm:items-start sm:bg-secondary animate-overlayShow"
})

const DialogContent = styled(RadixDialog.Content, {
  base: "relative flex flex-col p-[32px] rounded-[20px] w-[90vw] bg-white overflow-hidden sm:p-[24px] sm:w-full sm:h-full sm:rounded-none sm:!max-w-none xs:p-[16px] animate-in slide-in-from-top-[3%] zoom-in-[95%]",
  variants: {
    size: {
      sm: "max-w-[340px]",
      md: "max-w-[500px]",
      lg: "max-w-[640px]"
    }
  },
  defaultVariants: {
    size: "md"
  }
})

const DialogHeader = styled("div", {
  base: "sm:text-center flex flex-col gap-sm"
})

const DialogTitle = RadixDialog.Title

const DialogDescription = styled(RadixDialog.Description, {
  base: "text-darkGrey mb-5"
})
