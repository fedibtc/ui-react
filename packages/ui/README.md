# Fedi UI

Beautiful React Components for building Fedi Mods.

## Installation

Install the package with your desired package manager.

```
npm i @fedibtc/ui
yarn add @fedibtc/ui
pnpm install @fedibtc/ui
bun i @fedibtc/ui
```

## Getting Started

Import the required CSS file into your Layout file

```tsx
"use client";

import "./globals.css";
import "@fedibtc/ui/dist/components.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Then start using the components right off the bat

```tsx
import { Button, Text } from "@fedibtc/ui";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Click me</Button>
      <Text variant="h1" weight="bolder">
        Hi there!
      </Text>
    </main>
  );
}
```
