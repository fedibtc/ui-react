"use client"

import "./globals.css"
import "@fedibtc/ui/dist/index.css"

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
