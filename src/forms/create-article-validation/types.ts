import { z } from "zod"
import { TagSchema } from "../create-task-validation/types"

export const NewArticleSchema = z.object({
	title: z.string().min(1, { message: "Required" }).max(100, { message: "Up to 100 charact." }),
	htmlContent: z.string().min(2, { message: "Min 2 charact." }),
	tags: z.array(TagSchema),
	asDraft: z.boolean(),
})

export type NewArticleValues = z.infer<typeof NewArticleSchema>
