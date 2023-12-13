import { z } from 'zod';
import { ShortenedSchema, UrlSchema } from './create-url.dto';

export const ShortenedUrl = z.object({
	shortened: ShortenedSchema,
	url: UrlSchema,
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
	outputUrl: UrlSchema.nullable(),
});
export type ShortenedUrl = z.infer<typeof ShortenedUrl>;
