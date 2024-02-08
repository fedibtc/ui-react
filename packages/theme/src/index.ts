import plugin from "tailwindcss/plugin"
import theme from "./theme"

const themePlugin = plugin(() => {}, {
  theme: {
    extend: theme
  },
  corePlugins: {
    preflight: false
  }
})

export default themePlugin
