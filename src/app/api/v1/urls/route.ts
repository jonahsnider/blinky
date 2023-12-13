// fetch all urls

import { authService } from '@/api/auth/auth.service';
import { exceptionRouteWrapper } from '@/api/exception-wrapper';
import { CreateUrl } from '@/api/urls/dtos/create-url.dto';
import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { urlsService } from '@/api/urls/urls.service';
import { validateBody } from 'next-api-utils';
import { NextResponse } from 'next/server';

export const GET = exceptionRouteWrapper.wrapRoute<ShortenedUrl[]>(async (request) => {
	authService.assertRequestAuthenticated(request);

	const urls = await urlsService.getUrls();

	return NextResponse.json(urls);
});

export const POST = exceptionRouteWrapper.wrapRoute<ShortenedUrl>(async (request) => {
	authService.assertRequestAuthenticated(request);

	const body = await validateBody(request, CreateUrl);

	const url = await urlsService.createUrl(body);

	return NextResponse.json(url, {
		status: 201,
	});
});
