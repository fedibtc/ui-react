import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import "@fedibtc/ui/dist/index.css"
import {
  WebLNProvider,
  NostrProvider,
  ToastProvider
} from "@fedibtc/ui"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <WebLNProvider>
        <NostrProvider>
          <App />
        </NostrProvider>
      </WebLNProvider>
    </ToastProvider>
  </React.StrictMode>
)
