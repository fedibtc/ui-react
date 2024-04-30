export class MethodError extends Error {
  constructor(method: string, module: "nostr" | "api" | "webln") {
    super(
      `method ${method}() not found in Fedi ${module} injection. Please update the Fedi app and try again`
    )
    this.name = "MethodError"
  }
}
