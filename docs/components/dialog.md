# Dialog

A controlled dialog component.

## Usage

```tsx
import { Dialog, Button } from "@fedibtc/ui"
import { useState } from "react"

function MyFunction() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>

      <Dialog
        title="I am a Dialog"
        description="This is my description"
        open={open}
        onOpenChange={setOpen}
      >
        <p>Here is my content</p>
      </Dialog>
    </div>
  )
}
```

## Props

| Name         | Type                    | Description                                                  |
| ------------ | ----------------------- | ------------------------------------------------------------ |
| open         | boolean                 | Whether the dialog is open or not.                           |
| onOpenChange | (open: boolean) => void | A callback fired when the dialog is requested to be closed.  |
| children     | React.ReactNode         | The content of the dialog.                                   |
| title        | React.ReactNode         | The title of the dialog.                                     |
| description  | React.ReactNode         | The description of the dialog.                               |
| size         | "sm" \| "md" \| "lg"    | The size of the dialog. Must be one of "sm", "md", or "lg".  |
| disableClose | boolean                 | Whether the close button should be disabled (hidden) or not. |
