import { pathToFile, retrieveFile } from "./files"

type ImportType = {
  path: string
  type: "component" | "dependency" | "lib"
  fileName: string
}
/**
 * Parses an import statement and returns the path, type, and original fileName.
 */
function parseImport(statement: string, fileName: string): ImportType | null {
  const path = statement.match(/from "(.*)"/)?.[1]

  // Silently skip
  if (!path || !statement.startsWith("import ")) {
    return null
  }

  if (path.startsWith(".")) {
    const strippedPath = path.replace(/^[./]+/, "")

    return strippedPath.startsWith("lib")
      ? {
          path: pathToFile(strippedPath),
          fileName,
          type: "lib"
        }
      : fileName.startsWith("lib")
        ? {
            path: "lib/" + strippedPath + ".ts",
            fileName,
            type: "lib"
          }
        : {
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

/**
 * Extracts and returns an array of imports from the provided file, recursively
 */
export async function extractImports(
  file: string,
  existingImports: Array<ImportType> = [],
  visitedFiles: Set<string> = new Set<string>()
): Promise<Array<ImportType>> {
  visitedFiles.add(file)

  try {
    const content = await retrieveFile(pathToFile(file))
    let [directive, imports] = content.split("\n\n")

    let fileImports = /use\s/.test(directive) ? imports : directive

    const requiredImports: Array<ImportType> = fileImports
      .split("\n")
      .filter(imp => imp.startsWith("import "))
      .map(imp => parseImport(imp, file))
      .filter(
        x => x && x.path && !existingImports.some(y => y.path === x.path)
      ) as Array<ImportType>

    for (const imp of requiredImports) {
      if (
        imp.type === "lib" ||
        (imp.type === "component" && !visitedFiles.has(imp.fileName))
      ) {
        const childImports = await extractImports(
          imp.path,
          existingImports,
          visitedFiles
        )

        existingImports.push(
          ...childImports.filter(
            x =>
              x.path &&
              !requiredImports.some(y => y.path === x.path) &&
              !existingImports.some(y => y.path === x.path)
          )
        )
      }
    }

    return [...existingImports, ...requiredImports]
  } catch (err) {
    console.error(err)

    return existingImports
  }
}
