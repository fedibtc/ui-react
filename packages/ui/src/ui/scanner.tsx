"use client"

import QrScanner from "qr-scanner"
import React from "react"
import { styled } from "react-tailwind-variants"

export type ScannerProps = {
  /**
   * Whether the scanner is actively scanning for QR codes.
   */
  scanning: boolean
  /**
   * A function that is called when a QR code is successfully scanned.
   */
  onResult: (result: string) => void
  /**
   * A function that is called when an error occurs while scanning.
   */
  onError: (error: string) => void
} & React.VideoHTMLAttributes<HTMLVideoElement>

/**
 * A QR Code Scanner.
 */
export function Scanner({
  scanning,
  onResult,
  onError,
  ...props
}: ScannerProps) {
  const res = React.useRef<string | null>(null)
  const err = React.useRef<string | null>(null)
  const ref = React.useRef<HTMLVideoElement>(null)
  const scannerRef = React.useRef<QrScanner | null>(null)

  React.useEffect(() => {
    ;(async () => {
      if (!ref.current) return

      if (scanning) {
        scannerRef.current = new QrScanner(
          ref.current,
          result => {
            if (result && res.current !== result.data) {
              res.current = result.data
              onResult(result.data)
              if (scannerRef.current) {
                scannerRef.current.stop()
                scannerRef.current.$overlay?.remove()
              }
            }
          },
          {
            onDecodeError: error => {
              if (typeof error === "string" && err.current !== error) {
                err.current = error
                onError(error)
              } else if (
                typeof error !== "string" &&
                err.current !== error.message
              ) {
                err.current = error.message
                onError(error.message)
              }
            },
            highlightScanRegion: true,
            highlightCodeOutline: true,
            preferredCamera: "environment"
          }
        )
        scannerRef.current.setInversionMode("both")
        const video = ref.current
        const isPlaying =
          video.currentTime > 0 &&
          !video.paused &&
          !video.ended &&
          video.readyState > video.HAVE_CURRENT_DATA

        if (!isPlaying) await scannerRef.current.start()
      } else if (scannerRef.current) {
        scannerRef.current.stop()
        scannerRef.current.destroy()
        res.current = null
        err.current = null
        scannerRef.current = null
      }
    })()
  }, [scanning, ref, onError, onResult])

  return <Video ref={ref} scanning={scanning} {...props} />
}

const Video = styled("video", {
  base: "rounded-xl overflow-hidden aspect-square grow w-full max-w-[480px] object-cover",
  variants: {
    scanning: {
      true: "block",
      false: "hidden"
    }
  }
})
