import retrieveFile from "./retrieve"

type ImportType =
  | {
      path: string
      type: "component"
      fileName: string
    }
  | {
      path: string
      type: "dependency"
      fileName: string
    }
  | {
      path: string
      type: "lib"
      fileName: string
    }

const pathToFile = (path: string) => {
  if (path.endsWith(".tsx") || path.endsWith(".ts")) {
    return path
  }

  if (path.startsWith("lib")) {
    return path + ".ts"
  } else {
    return path + ".tsx"
  }
}

function parseImport(statement: string, fileName: string): ImportType | null {
  if (!statement.startsWith("import ")) {
    return null
  }

  const match = statement.match(/from "(.*)"/)

  // Silently skip
  if (!match?.[1]) {
    console.warn("Invalid import statement found. Skipping.")

    return null
  }

  const path = match[1]

  if (path.startsWith(".")) {
    const strippedPath = path.replace(/^[./]+/, "")

    if (strippedPath.startsWith("lib")) {
      return {
        path: pathToFile(strippedPath),
        fileName,
        type: "lib"
      }
    }

    if (fileName.startsWith("lib")) {
      return {
        path: "lib/" + strippedPath + ".ts",
        fileName,
        type: "lib"
      }
    }

    return {
      path: pathToFile("components/ui/" + strippedPath),
      fileName,
      type: "component"
    }
  }

  return {
    path,
    fileName,
    type: "dependency"
  }
}

export async function transformFile(
  file: string,
  existingImports: Array<ImportType> = [],
  visitedFiles: Set<string> = new Set<string>()
): Promise<{ content: string; imports: Array<ImportType> }> {
  visitedFiles.add(file)

  try {
    const content = await retrieveFile(pathToFile(file))
    let [directive, imports, ...rest] = content.split("\n\n")

    const output = [directive, imports, ...rest]

    let fileImports = /use\s/.test(directive) ? imports : directive

    const requiredImports: Array<ImportType> = fileImports
      .split("\n")
      .filter(imp => imp.startsWith("import "))
      .map(imp => parseImport(imp, file))
      .filter(
        x => x && x.path && !existingImports.some(y => y.path === x.path)
      ) as Array<ImportType>

    console.log(
      "REQ",
      requiredImports.map(x => x.path),
      existingImports.map(x => x.path)
    )

    for (const imp of requiredImports) {
      if (imp.type === "lib" || imp.type === "component") {
        const childImports = await transformFile(
          imp.path,
          existingImports,
          visitedFiles
        )

        existingImports.push(
          ...childImports.imports.filter(
            x => x.path && !existingImports.some(y => y.path === x.path)
          )
        )
      }
    }

    return {
      content: output.join("\n\n"),
      imports: [...existingImports, ...requiredImports]
    }
  } catch (err) {
    console.error(err)

    return { content: "", imports: existingImports }
  }
}
