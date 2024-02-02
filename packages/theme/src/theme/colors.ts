import theme from "tailwindcss/colors"

export const colors = {
  green: { ...theme.green, DEFAULT: "rgb(0, 168, 42)" },
  orange: { ...theme.orange, DEFAULT: "rgb(223, 123, 0)" },
  darkGrey: "rgb(109, 112, 113)",
  grey: "rgb(133, 135, 137)",
  lightGrey: "rgb(211, 212, 219)",
  extraLightGrey: "rgb(233, 233, 234)",
  keyboardGrey: "rgb(232, 234, 237)",
  red: {
    ...theme.red,
    DEFAULT: "rgb(224, 11, 0)"
  },
  white: "rgb(255, 255, 255)",
  black: "rgb(0, 0, 0)",
  night: "rgb(11, 16, 19)",
  blue: { ...theme.blue, DEFAULT: "rgb(2, 119, 242)" },
  link: "rgb(2, 119, 242)",
  primary: "rgb(11, 16, 19)",
  primaryLight: "rgb(109, 112, 113)",
  primaryVeryLight: "rgb(211, 212, 219)",
  success: "rgb(0, 168, 42)",
  secondary: "rgb(255, 255, 255)"
}
