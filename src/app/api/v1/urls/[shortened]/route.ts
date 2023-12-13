import { authService } from '@/api/auth/auth.service';
import { exceptionRouteWrapper } from '@/api/exception-wrapper';
import { BaseHttpException } from '@/api/exceptions/base.exception';
import { ExceptionSchema } from '@/api/exceptions/dtos/exception.dto';
import { CreateUrl } from '@/api/urls/dtos/create-url.dto';
import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { urlsService } from '@/api/urls/urls.service';
import { NextRouteHandlerContext, validateBody, validateParams } from 'next-api-utils';
import { NextResponse } from 'next/server';
import { z } from 'zod';

type Context = NextRouteHandlerContext<{
	shortened: string;
}>;

export const GET = exceptionRouteWrapper.wrapRoute<ShortenedUrl, Context>(async (_request, context) => {
	const params = validateParams(context, z.object({ shortened: z.string().min(1).max(256) }));

	const url = await urlsService.getUrlByShortened(params.shortened);

	if (!url) {
		throw new BaseHttpException(`The URL "${params.shortened}" does not exist`, 404);
	}

	return NextResponse.json(url);
});

export const DELETE = exceptionRouteWrapper.wrapRoute<{ deleted: true } | ExceptionSchema, Context>(
	async (request, context) => {
		authService.assertRequestAuthenticated(request);

		const params = validateParams(context, z.object({ shortened: z.string().min(1).max(256) }));

		await urlsService.deleteUrlByShortened(params.shortened);

		return NextResponse.json({
			deleted: true,
		});
	},
);

export const PUT = exceptionRouteWrapper.wrapRoute<ShortenedUrl, Context>(async (request, context) => {
	authService.assertRequestAuthenticated(request);

	const params = validateParams(context, z.object({ shortened: z.string().min(1).max(256) }));

	const body = await validateBody(request, CreateUrl);

	const updatedUrl = await urlsService.updateUrlByShortened(params.shortened, body);

	return NextResponse.json(updatedUrl);
});
