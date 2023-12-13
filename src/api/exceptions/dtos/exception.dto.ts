import { z } from 'zod';

export const ExceptionSchema = z.object({
	message: z.string(),
	statusCode: z.number(),
	error: z.string(),
});
export type ExceptionSchema = z.infer<typeof ExceptionSchema>;
