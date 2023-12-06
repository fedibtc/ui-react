import { FediConfig } from "./config"

function parseImport(statement: string) {
  console.log(statement.match(/import\s+(.+)\s+from\s+"(.+)"/))
}

export function transformFile(content: string, { rsc }: FediConfig) {
  let [directive, imports, ...rest] = content.split("\n\n")

  const output = [directive, imports, ...rest]

  if (!rsc) {
    output.shift()
  }

  console.log(directive, imports)

  console.log(imports.split("\n").map(parseImport))

  return {
    content: output.join("\n\n")
  }
}
