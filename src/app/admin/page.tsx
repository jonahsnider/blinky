'use client';

import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { ApiKeyInput } from '@/components/admin/api-key-input';
import { FormatUrls } from '@/components/admin/view-urls/format-urls';
import { H2 } from '@/components/headings/h2';
import { useApiKey } from '@/hooks/use-api-key';
import { HttpError, fetcherWithApiKey } from '@/swr';
import useSwr from 'swr';

// biome-ignore lint/nursery/noDefaultExport: Pages must have a default export
export default function AdminPage() {
	const apiKey = useApiKey();

	const {
		data: urls,
		isLoading,
		error,
	} = useSwr<ShortenedUrl[], HttpError>(['/api/v1/urls', apiKey], { fetcher: fetcherWithApiKey });

	return (
		<div className='flex flex-col gap-6 w-full max-w-4xl'>
			<div className='flex flex-col gap-2'>
				<H2>API key</H2>

				<ApiKeyInput />
			</div>
			{apiKey && (
				<div className='flex flex-col gap-2'>
					<H2>URLs</H2>

					<FormatUrls urls={urls} isLoading={isLoading} exception={error} />
				</div>
			)}
		</div>
	);
}
