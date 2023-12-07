/**
 * Retrieves the contents of a component or utility on Github.
 */
export async function retrieveFile(path: string) {
  const res = await fetch(
    "https://raw.githubusercontent.com/fedibtc/ModRepo/master/packages/ui/src/" +
      path
  )

  if (res.ok) {
    return await res.text()
  }

  throw new Error("Failed to retrieve file " + path)
}

/**
 * Adds the file extension to the provided file path if not already present.
 */
export const pathToFile = (path: string) => {
  if (path.endsWith(".tsx") || path.endsWith(".ts")) {
    return path
  }

  if (path.startsWith("lib")) {
    return path + ".ts"
  } else {
    return path + ".tsx"
  }
}
