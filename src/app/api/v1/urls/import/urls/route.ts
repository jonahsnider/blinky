import { authService } from '@/api/auth/auth.service';
import { exceptionRouteWrapper } from '@/api/exception-wrapper';
import { CreateUrl } from '@/api/urls/dtos/create-url.dto';
import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { urlsService } from '@/api/urls/urls.service';
import { validateBody } from 'next-api-utils';
import { NextResponse } from 'next/server';

export const POST = exceptionRouteWrapper.wrapRoute<ShortenedUrl[]>(async (request) => {
	authService.assertRequestAuthenticated(request);

	const urlsToCreate = await validateBody(request, CreateUrl.array().nonempty());

	const urls = await urlsService.createManyUrls(urlsToCreate);

	return NextResponse.json(urls);
});
