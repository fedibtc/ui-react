# Color Utilities

Utilities for working with fedi-themed colors.

## getIdendityColors

An algorithm that gives you a pair of colors based on a numeric or string ID.

### Usage

```ts
import { getIdendityColors } from "@fedibtc/ui"

getIdentityColors(1) // ['#F0F4C3', '#AFB42B']
getIdentityColors("John Doe") // ['#B2DFDB', '#00796B']
getIdentityColors("Mickey Mouse") // ['#C5CAE9', '#303F9F']
```

### Call Signature

```ts
function getIdendityColors(id: string | number): [string, string]
```

## hexToRgba

Converts a hex code to an rgba string.

### Usage

```ts
import { hexToRgba } from "@fedibtc/ui"

hexToRgba("#FF0000", 0.5) // 'rgba(255, 0, 0, 0.5)'
hexToRgba("#00FF00", 0.5) // 'rgba(0, 255, 0, 0.5)'
hexToRgba("#0000FF", 0.5) // 'rgba(0, 0, 255, 0.5)'
```

### Call Signature

```ts
function hexToRgba(hex: string, alpha: number): string
```
