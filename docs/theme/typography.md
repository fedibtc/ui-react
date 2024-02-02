# Typography

Includes Font Family, Font Size, and Font Weight tailwind theme modifications.

## Font Family

Modifies the TailwindCSS [fonts](https://tailwindcss.com/docs/font-family) theme property.

| Key    | Fonts                                                                            |
| ------ | -------------------------------------------------------------------------------- |
| `body` | `"Albert Sans", sans-serif`                                                      |
| `mono` | `"SFMono-Regular", "Consolas", "Liberation Mono", "Menlo", "Courier", monospace` |

### Usage

Use the `font-` prefix to apply the custom font families.

```html
<span class="font-body">Albert Sans</span>
<code class="font-mono">SFMono-Regular</code>
```

## Font Size

Modifies the TailwindCSS [fontSize](https://tailwindcss.com/docs/font-size) theme property.

| Key       | Value |
| --------- | ----- |
| `display` | 80px  |
| `h1`      | 32px  |
| `h2`      | 24px  |
| `body`    | 16px  |
| `caption` | 14px  |
| `small`   | 12px  |
| `tiny`    | 10px  |

### Usage

Use the `text-` prefix to apply the custom font sizes.

```html
<h1 class="text-h1">Heading 1</h1>
<p class="text-body">Body text</p>
<small class="text-small">Small text</small>
```

## Font Weight

Modifies the TailwindCSS [fontWeight](https://tailwindcss.com/docs/font-weight) theme property.

| Key      | Value |
| -------- | ----- |
| `normal` | 400   |
| `medium` | 500   |
| `bold`   | 600   |
| `bolder` | 700   |

### Usage

Use the `font-` prefix to apply the custom font weights.

```html
<p class="font-normal">Normal weight</p>
<p class="font-medium">Medium weight</p>
<p class="font-bold">Bold weight</p>
<p class="font-bolder">Bolder weight</p>
```
