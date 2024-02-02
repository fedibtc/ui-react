# Scanner

A QR Code scanner.

## Usage

```tsx
import Scanner from "@fedibtc/ui"
import { useState } from "react"

function MyComponent() {
  const [scanning, setScanning] = useState(false)

  return (
    <div>
      <Button onClick={() => setScanning(true)}>Start Scanning</Button>

      <Scanner
        scanning={scanning && pInvoiceOpen}
        onResult={result => {
          console.log(result)
          setScanning(false)
        }}
        onError={console.log}
      />
    </div>
  )
}
```

## Props

| Name       | Type                       | Description                                                       |
| ---------- | -------------------------- | ----------------------------------------------------------------- |
| `scanning` | `boolean`                  | Whether the scanner is actively scanning for QR codes.            |
| `onResult` | `(result: string) => void` | A function that is called when a QR code is successfully scanned. |
| `onError`  | `(error: string) => void`  | A function that is called when an error occurs while scanning.    |
