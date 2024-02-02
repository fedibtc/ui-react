import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import "@fedibtc/ui/dist/index.css"
import { Toaster, WebLNProvider, NostrProvider } from "@fedibtc/ui"

import { theme } from "@fedibtc/tailwind-theme"

console.log(theme)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WebLNProvider>
      <NostrProvider>
        <App />
      </NostrProvider>
    </WebLNProvider>
    <Toaster />
  </React.StrictMode>
)
