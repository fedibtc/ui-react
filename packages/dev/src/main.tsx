import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import "@fedibtc/ui/dist/index.css"
import { Toaster, WebLNProvider, NostrProvider } from "@fedibtc/ui"

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
