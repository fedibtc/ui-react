export const formatError = (error: Error | unknown): string => {
  console.log(error)

  if (error instanceof Error) return error.message
  else if ("message" in (error as any)) return (error as any).message as string

  return "An unknown error occurred"
}
