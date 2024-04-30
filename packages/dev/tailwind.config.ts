import type { Config } from "tailwindcss"
import fediTheme from "@fedibtc/tailwind-theme"

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [fediTheme]
}
export default config
