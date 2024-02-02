# Fedi UI Tailwind Theme

A TailwindCSS plugin that enables you to re-use the themed CSS classes used in the [@fedibtc/ui](https://www.npmjs.com/package/@fedibtc/ui) UI library.

## Getting Started

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

## Links

- [GitHub](https://github.com/fedibtc/ui-react)
- [Docs](https://fedibtc.github.io/fedi-docs/)
- [NPM](https://www.npmjs.com/package/@fedibtc/tailwind-theme)
- [UI Library (NPM)](https://www.npmjs.com/package/@fedibtc/ui)
