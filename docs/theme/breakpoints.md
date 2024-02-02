# Breakpoints

Unlike the default [TailwindCSS responsive breakpoints](https://tailwindcss.com/docs/responsive-design), the main breakpoints in this theme are desktop-first with `min-sm` being the only exception.

| Breakpoint prefix | Minimum width | CSS                          |
| ----------------- | ------------- | ---------------------------- |
| `xs`              | 359px         | `@media (max-width: 359px)`  |
| `sm`              | 600px         | `@media (min-width: 600)`    |
| `md`              | 980px         | `@media (max-width: 980px)`  |
| `lg`              | 1280px        | `@media (max-width: 1280px)` |
| `xl`              | 1440px        | `@media (max-width: 1440px)` |
| `min-sm`          | 600px         | `@media (min-width: 600px)`  |

## Usage

To use a breakpoint, simply prefix a class name with the breakpoint code.

```html
<!-- Set the width to 100% on screens smaller than the `sm` breakpoint -->
<div class="w-[80%] sm:w-full"></div>
```

Use the `min-sm` breakpoint to target screens larger than the `sm` breakpoint

```html
<!-- Set the width to 80% on screens larger than the `min-sm` breakpoint-->
<div class="min-sm:w-[80%] w-full"></div>
```
