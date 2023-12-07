import inquirer from "inquirer"
import chalk from "chalk"
import { transformFile } from "../lib/transform"

const components = [
  "avatar",
  "button",
  "checkbox",
  "checkbox-group",
  "dialog",
  "input",
  "icon",
  "nostr-provider",
  "radio-group",
  "scanner",
  "text",
  "toast",
  "webln-provider"
]

export default async function installCommand(component: string) {
  try {
    let injectComponent: string | null = null

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

    console.log(
      (await transformFile(`components/ui/${injectComponent}.tsx`)).imports
    )
  } catch (err) {
    console.log(chalk.red((err as Error).message))
    process.exit(1)
  }
}
