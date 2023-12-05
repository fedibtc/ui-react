"use client"

import "./globals.css"
import "@fedibtc/ui/dist/components.css"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
