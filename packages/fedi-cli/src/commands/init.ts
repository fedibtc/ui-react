import chalk from "chalk"
import { Command } from "commander"
import fs from "fs"
import inquirer from "inquirer"

export default async function initCommand(_: string, command: Command) {
  try {
    let componentDir = command.opts().dir || ""

    if (!fs.existsSync(componentDir)) {
      if (command.opts().dir) {
        console.log(chalk.red("The directory you specified does not exist"))
      }

      const { compDir } = await inquirer.prompt([
        {
          type: "input",
          name: "compDir",
          message: "Where do you want to store your components?",
          default: "components/ui"
        }
      ])

      if (!fs.existsSync(compDir)) {
        const { shouldCreateDirPath } = await inquirer.prompt([
          {
            type: "confirm",
            name: "shouldCreateDirPath",
            message:
              "The directory you specified does not exist. Would you like to create it?",
            default: true
          }
        ])

        if (shouldCreateDirPath) {
          fs.mkdirSync(compDir, { recursive: true })
          componentDir = compDir
        } else {
          console.log("Aborting.")
          process.exit(1)
        }
      } else {
        componentDir = compDir
      }
    }

    let rsc = Boolean(command.opts().rsc)

    if (!command.opts().rsc) {
      const { shouldUseRsc } = await inquirer.prompt([
        {
          type: "confirm",
          name: "shouldUseRsc",
          message: "Are you using React Server Components?",
          default: true
        }
      ])

      rsc = shouldUseRsc
    }

    fs.writeFileSync(
      "fedi.json",
      JSON.stringify(
        {
          componentDir,
          rsc
        },
        null,
        2
      ),
      "utf-8"
    )
  } catch (e) {
    console.error(e)
    console.log(chalk.red((e as Error).message))
    process.exit(1)
  }
}
