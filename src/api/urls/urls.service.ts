import { Url as UrlEntity } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from '../db/prisma';
import { BaseHttpException } from '../exceptions/base.exception';

import { configService } from '../config/config.service';
import { CreateUrl } from './dtos/create-url.dto';
import { ShortenedUrl } from './dtos/shortened-url.dto';

export class UrlsService {
	private static entityToDto(url: UrlEntity): ShortenedUrl {
		return {
			createdAt: url.createdAt.toISOString(),
			url: url.url,
			outputUrl: configService.baseUrl ? new URL(url.shortened, configService.baseUrl).toString() : url.shortened,
			shortened: url.shortened,
			updatedAt: url.updatedAt.toISOString(),
		};
	}

	/** Get all URLs. */
	async getUrls(): Promise<ShortenedUrl[]> {
		const urls = await prisma.url.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});

		return urls.map(UrlsService.entityToDto);
	}

	async createUrl(data: CreateUrl): Promise<ShortenedUrl> {
		try {
			const url = await prisma.url.create({
				data: {
					...data,
				},
			});

			return UrlsService.entityToDto(url);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
				throw new BaseHttpException(`The URL "${data.shortened} already exists"`, 409);
			}

			throw error;
		}
	}

	async createManyUrls(data: CreateUrl[]): Promise<ShortenedUrl[]> {
		await prisma.url.createMany({
			data,
			skipDuplicates: true,
		});

		return this.getUrlsByShortened(data.map((url) => url.shortened));
	}

	async getUrlByShortened(shortened: string): Promise<ShortenedUrl | undefined> {
		const url = await prisma.url.findFirst({
			where: {
				shortened,
			},
		});

		return url ? UrlsService.entityToDto(url) : undefined;
	}

	async deleteUrlByShortened(shortened: string): Promise<undefined> {
		try {
			await prisma.url.delete({
				where: {
					shortened,
				},
			});
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
				throw new BaseHttpException(`The URL "${shortened}" does not exist`, 404);
			}

			throw error;
		}
	}

	async updateUrlByShortened(shortened: string, data: Partial<ShortenedUrl>): Promise<ShortenedUrl> {
		try {
			const url = await prisma.url.update({
				where: {
					shortened,
				},
				data,
			});

			return UrlsService.entityToDto(url);
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
				throw new BaseHttpException(`The URL "${shortened}" does not exist`, 404);
			}

			throw error;
		}
	}

	private async getUrlsByShortened(shortened: string[]): Promise<ShortenedUrl[]> {
		const urls = await prisma.url.findMany({
			where: {
				shortened: {
					in: shortened,
				},
			},
		});

		return urls.map(UrlsService.entityToDto);
	}
}

export const urlsService = new UrlsService();
