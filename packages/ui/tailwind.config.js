/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate"
import plugin from "@fedibtc/tailwind-theme"

export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  plugins: [plugin, animate]
}
