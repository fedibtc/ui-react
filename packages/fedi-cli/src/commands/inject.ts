import inquirer from "inquirer"
import fs from "fs"
import chalk from "chalk"
import { FediConfig, FediConfigSchema } from "../types"

const components = [
  "Avatar",
  "Button",
  "Checkbox",
  "CheckboxGroup",
  "Dialog",
  "Input",
  "NostProvider",
  "RadioGroup",
  "Scanner",
  "Text",
  "Toast",
  "WebLNProvider"
]

export default async function installCommand(component: string) {
  try {
    let init: FediConfig | null = null
    let injectComponent: string | null = null

    if (fs.existsSync("fedi.json")) {
      const res = FediConfigSchema.safeParse(
        JSON.parse(fs.readFileSync("fedi.json", "utf-8"))
      )

      if (res.success) {
        init = res.data
      } else {
        console.log(
          chalk.red(
            "Corrupted fedi.json file. Please re-initialize with `fedi-cli init`"
          )
        )
        process.exit(1)
      }
    } else {
      console.log(
        chalk.red(
          "fedi.json file not found. Please initialize with `fedi-cli init`"
        )
      )
      process.exit(1)
    }

    const indexedComponent = components.find(
      x => x.toLowerCase() === component?.toLowerCase()
    )
    if (indexedComponent) {
      injectComponent = indexedComponent
    } else {
      const { componentName } = await inquirer.prompt([
        {
          type: "list",
          name: "componentName",
          message: "Choose component",
          loop: false,
          choices: components
        }
      ])

      injectComponent = componentName
    }

    console.log(injectComponent, init)
  } catch (err) {
    console.log(chalk.red((err as Error).message))
    process.exit(1)
  }
}
