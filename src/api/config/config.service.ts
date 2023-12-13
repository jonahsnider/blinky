import { z } from 'zod';

export class ConfigService {
	public readonly adminApiToken: string | undefined;
	public readonly baseUrl: URL | undefined;

	constructor(source: Readonly<Record<string, unknown>>) {
		this.adminApiToken = z.string().min(1).optional().parse(source.ADMIN_PASSWORD);
		this.baseUrl = z
			.string()
			.url()
			.optional()
			.transform((url) => (url !== undefined ? new URL(url) : undefined))
			.parse(source.BASE_URL);
	}
}

export const configService = new ConfigService(process.env);
