# Getting Started

Install the UI Library and Tailwind Theme.

## UI Library Setup

### 1. Install the UI Library

Install the package from the command line

```bash
npm install @fedibtc/ui
```

### 2. Import Styles

Import the required `index.css` file into your app's layout.

```js
import "@fedibtc/ui/dist/index.css"
```

### 3. Start Building

Start using the components in your app.

```tsx
import { Button, Text } from "@fedibtc/ui"

export default function App() {
  return (
    <main>
      <Button>Click me</Button>
      <Text variant="h1" weight="bolder">
        Hi there!
      </Text>
    </main>
  )
}
```

## Tailwind Theme Setup

Use the [@fedibtc/tailwind-theme](https://www.npmjs.com/package/@fedibtc/tailwind-theme) plugin to start using themed TailwindCSS classes.

### 1. Set up TailwindCSS

Install and set up Tailwind CSS with PostCSS and Autoprefixer if you haven't already.

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Install the Plugin

Install the plugin from the command line

```bash
npm install @fedibtc/tailwind-theme
```

### 3. Add it to `tailwind.config.js`

Import and add the plugin to the `plugins` entry in `tailwind.config.js`

```diff
// tailwind.config.js
module.exports = {
+  plugins: [require("@fedibtc/tailwind-theme")]
}
```
