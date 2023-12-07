import inquirer from "inquirer"
import chalk from "chalk"
import { extractImports } from "../lib/imports"

const components = [
  "avatar",
  "button",
  "checkbox",
  "checkbox-group",
  "dialog",
  "input",
  "icon",
  "nostr-provider",
  "radio",
  "scanner",
  "text",
  "toaster",
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

    console.log(await extractImports(`components/ui/${injectComponent}.tsx`))
  } catch (err) {
    console.log(chalk.red((err as Error).message))
    process.exit(1)
  }
}
