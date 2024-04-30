import { ToastProvider, WebLNProvider } from "@fedibtc/ui"
import "@fedibtc/ui/dist/index.css"
import type { Metadata } from "next"
import { Albert_Sans } from "next/font/google"
import "./globals.css"
import { NostrProvider } from "@fedibtc/ui"

const albertSans = Albert_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Multispend",
  description: "Securely share sats with your friends",
  icons: ["logo.png"]
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={albertSans.className}>
        <ToastProvider>
          <WebLNProvider>
            <NostrProvider>{children}</NostrProvider>
          </WebLNProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
