import { z } from 'zod'

export const ScratchSetupIdentitySchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Required' })
		.max(30, { message: 'Up to 30 charact.' }),
	id: z
		.string()
		.min(3, { message: 'At least 3 characters must be' })
		.max(8, { message: '8 characters required' }),
	tagValue: z.string().max(20, { message: 'Up to 20 charact.' }).optional(),
	tagColor: z.string().optional(),
})

export type ScratchSetupIdentityValues = z.infer<
	typeof ScratchSetupIdentitySchema
>
