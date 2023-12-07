#!/usr/bin/env node
import { program } from "commander"
import initCommand from "./commands/init"
import injectCommand from "./commands/inject"

// CLI Information
program
  .name("fedi-cli")
  .description("A CLI for creating Fedi Mods.")
  .version("0.0.1")

// Inject Command
program
  .command("inject")
  .description("Inject a Fedi UI Component into the workspace")
  .argument(
    "[component]",
    "The Component to inject. If not provided, displays a list of possible components."
  )
  .action(injectCommand)

// Init Command
program
  .command("init")
  .description("Initialize the workspace")
  .option("-d, --dir <path>", "The component directory")
  .option("--rsc", "Whether to use React Server Components")
  .action(initCommand)

program.parse(process.argv)
