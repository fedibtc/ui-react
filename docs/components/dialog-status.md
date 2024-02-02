# DialogStatus

Shows a status confirmation once its `status` has switched from `loading` to one of "success" or "error".

## Usage

```tsx
import { Dialog, DialogStatus, Button } from "@fedibtc/ui"
import { useState } from "react"

function MyFunction() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<
    "success" | "error" | "loading" | undefined
  >(undefined)

  const submit = (status: "success" | "error") => {
    setStatus("loading")
    setTimeout(() => {
      setStatus(status)
      setTimeout(() => {
        setOpen(false)
        setStatus(undefined)
      }, 2000)
    }, 2000)
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>

      <Dialog
        title="I am a Dialog"
        description="Click one of the buttons in me or nothing will happen"
        open={open}
        onOpenChange={setOpen}
      >
        <Button onClick={() => submit("success")}>Succeed</Button>
        <Button onClick={() => submit("error")}>Fail</Button>

        {status && (
          <DialogStatus
            status={status}
            title={`Status: ${status}`}
            description="This is a description"
          />
        )}
      </Dialog>
    </div>
  )
}
```

## Props

| Name        | Type                              | Description                                                                |
| ----------- | --------------------------------- | -------------------------------------------------------------------------- |
| status      | "success" \| "error" \| "loading" | The status of the dialog. Must be one of "success", "error", or "loading". |
| title       | React.ReactNode                   | The status title                                                           |
| description | React.ReactNode                   | The status description                                                     |
