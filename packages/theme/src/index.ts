import plugin from "tailwindcss/plugin"
import theme from "./theme"

const themePlugin = plugin(() => {}, {
  theme: {
    extend: theme
  }
})

export default themePlugin
