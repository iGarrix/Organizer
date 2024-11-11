import { z } from "zod"

export const TagSchema = z.object({
	index: z.string(),
	color: z.string(),
})

export const NewTaskSchema = z.object({
	title: z.string().min(1, { message: "Required" }).max(100, { message: "Up to 100 charact." }),
	htmlContent: z.string().min(2, { message: "Min 2 charact." }),
	tags: z.array(TagSchema),
	asDraft: z.boolean(),
})

export type NewTaskValues = z.infer<typeof NewTaskSchema>
