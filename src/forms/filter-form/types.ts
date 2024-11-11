import { z } from "zod"

export const FilterSchema = z.object({
	findValue: z.string().max(50, { message: "Up to 100 charact." }),
	selectAll: z.boolean(),
	selectedTaskIds: z.array(z.string()),
})

export type FilterValues = z.infer<typeof FilterSchema>
