import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { HttpError } from '@/swr';
import { notFound, redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import * as route from '../api/v1/urls/[shortened]/route';

// biome-ignore lint/nursery/noDefaultExport: Pages must have a default export
export default async function UrlSubpathPage({
	params: rawParams,
}: {
	params: { shortened: string };
}) {
	const rawShortened = decodeURIComponent(rawParams.shortened);

	const request = new NextRequest(`http://localhost:3000/api/${rawShortened}`, {
		redirect: 'manual',
	});
	const response = await route.GET(request, { params: { shortened: rawShortened } });

	if (response.status === 404) {
		notFound();
	}

	if (!response.ok) {
		throw await HttpError.create(response);
	}
	const responseBody = await response.json();

	const parsed = ShortenedUrl.parse(responseBody);

	redirect(parsed.url);
}
