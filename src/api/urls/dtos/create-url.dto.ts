import { z } from 'zod';

export const UrlSchema = z.string().url().min(1).max(1024);
export type UrlSchema = z.infer<typeof UrlSchema>;

export const ShortenedSchema = z.string().min(1).max(256);
export type ShortenedSchema = z.infer<typeof ShortenedSchema>;

export const CreateUrl = z.object({
	shortened: ShortenedSchema,
	url: UrlSchema,
});
export type CreateUrl = z.infer<typeof CreateUrl>;
