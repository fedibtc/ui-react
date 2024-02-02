# Colors

Fedi uses a custom color palette. The colors are hardcoded values and do not provide different hues such as `bg-sky-500`.

Colors provided in the custom palette override the default TailwindCSS colors, meaning you can't use something like `bg-green-500`.

| Color            | Value              | Equivalent                 |
| ---------------- | ------------------ | -------------------------- |
| green            | rgb(0, 168, 42)    | Same as `success`          |
| orange           | rgb(223, 123, 0)   | N/A                        |
| darkGrey         | rgb(109, 112, 113) | Same as `primaryLight`     |
| grey             | rgb(133, 135, 137) | N/A                        |
| lightGrey        | rgb(211, 212, 219) | Same as `primaryVeryLight` |
| extraLightGrey   | rgb(233, 233, 234) | N/A                        |
| keyboardGrey     | rgb(232, 234, 237) | N/A                        |
| red              | rgb(224, 11, 0)    | N/A                        |
| white            | rgb(255, 255, 255) | N/A                        |
| black            | rgb(0, 0, 0)       | N/A                        |
| night            | rgb(11, 16, 19)    | Same as `primary`          |
| blue             | rgb(2, 119, 242)   | Same as `link`             |
| link             | rgb(2, 119, 242)   | Same as `blue`             |
| primary          | rgb(11, 16, 19)    | Same as `night`            |
| primaryLight     | rgb(109, 112, 113) | Same as `darkGrey`         |
| primaryVeryLight | rgb(211, 212, 219) | Same as `lightGrey`        |
| success          | rgb(0, 168, 42)    | Same as `green`            |
| secondary        | rgb(255, 255, 255) | Same as `white`            |

## Usage

Use a color the same way you would in TailwindCSS.

```html
<span class="text-primary">Hello, world!</span>
<div class="bg-extraLightGrey">Hello, world!</div>
```
