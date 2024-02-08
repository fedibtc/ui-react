# String Utilities

String Utilities.

## getInitialsFromName

Get initials from a name.

### Usage

```ts
import { stringUtils } from "@fedibtc/ui"

stringUtils.getInitialsFromName("John Doe") // outputs 'JD'
```

### Call Signature

```ts
function getInitialsFromName(name: string): string
```

## truncateMiddleOfString

Truncates the middle of a string, showing `numberOfCharacters` characters at the beginning and end.

### Usage

```ts
import { stringUtils } from "@fedibtc/ui"

stringUtils.truncateMiddleOfString(
  "the lazy cat ducked under the energetic dog",
  5
) // outputs 'the...dog'
```

### Call Signature

```ts
function truncateMiddleOfString(
  longString: string,
  numberOfCharacters: number
): string
```

## keepOnlyLowercaseLetters

Filters out all characters that are not lowercase letters from a string.

### Usage

```ts
import { stringUtils } from "@fedibtc/ui"

stringUtils.keepOnlyLowercaseLetters("ThIs Is A tEsT") // outputs 'hssst'
```

### Call Signature

```ts
function keepOnlyLowercaseLetters(str: string): string
```

```

```
