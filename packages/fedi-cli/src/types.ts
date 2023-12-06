import z from "zod"

export const FediConfigSchema = z.object({
  componentDir: z.string(),
  rsc: z.boolean()
})

export type FediConfig = z.infer<typeof FediConfigSchema>
