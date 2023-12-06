import fs from "fs"
import z from "zod"

export const FediConfigSchema = z.object({
  componentDir: z.string(),
  rsc: z.boolean()
})

export type FediConfig = z.infer<typeof FediConfigSchema>

export default function getConfig(): FediConfig {
  if (fs.existsSync("fedi.json")) {
    const res = FediConfigSchema.safeParse(
      JSON.parse(fs.readFileSync("fedi.json", "utf-8"))
    )

    if (res.success) {
      return res.data
    } else {
      throw new Error(
        "Corrupted fedi.json file. Please re-initialize with `fedi-cli init`"
      )
    }
  } else {
    throw new Error(
      "fedi.json not found. Please initialize with `fedi-cli init`"
    )
  }
}
