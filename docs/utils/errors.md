# formatError

The `formatError` function is used to format error messages.

## Usage

### Format an Error

```tsx
import { formatError } from "@fedibtc/ui"

try {
  throw new Error("This is an error")
} catch (error) {
  console.log(formatError(error))
}
```

### Format a Zod error

```tsx
import { z } from "zod"

const schema = z.object({
  name: z.string(),
  age: z.number()
})

try {
  schema.parse({ name: "John", age: "25" })
} catch (error) {
  console.log(formatError(error))
}

// or

const res = schema.safeParse({ name: "John", age: "25" })

if (res.success === false) {
  console.log(formatError(res.error))
}
```

## Reference

### Signature

```tsx
declare function formatError(error: Error | ZodError | unknown): string
```
