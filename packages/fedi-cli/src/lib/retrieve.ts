export type FilePath =
  | `components/${string}.${"ts" | "tsx"}`
  | `lib/${string}.{"ts" | "tsx"}`

export default async function retrieveFile(path: FilePath) {
  const res = await fetch(
    "https://raw.githubusercontent.com/fedibtc/ModRepo/master/packages/ui/src/" +
      path
  )

  if (res.ok) {
    return await res.text()
  }

  throw new Error("Failed to retrieve file " + path)
}
