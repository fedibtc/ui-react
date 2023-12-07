export default async function retrieveFile(path: string) {
  const res = await fetch(
    "https://raw.githubusercontent.com/fedibtc/ModRepo/master/packages/ui/src/" +
      path
  )

  if (res.ok) {
    return await res.text()
  }

  throw new Error("Failed to retrieve file " + path)
}
