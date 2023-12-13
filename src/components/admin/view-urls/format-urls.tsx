import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { HttpError } from '@/swr';
import { PropsWithChildren } from 'react';
import { AdminUrlsTable } from './admin-urls-table';
import { NoUrls } from './no-urls';

type Props = {
	urls?: readonly ShortenedUrl[];
	isLoading: boolean;
	exception: HttpError | undefined;
};

function Container({ children }: PropsWithChildren) {
	return <div className='bg-neutral-800 p-4 rounded shadow'>{children}</div>;
}

export function FormatUrls({ urls, isLoading, exception: error }: Props) {
	if (error) {
		return (
			<Container>
				<p className='text-red-500 max-w-xl'>Error: {error.message}</p>
			</Container>
		);
	}

	if (isLoading) {
		return (
			<Container>
				<p>Loading...</p>
			</Container>
		);
	}

	if (!urls || urls.length === 0) {
		return (
			<Container>
				<NoUrls />
			</Container>
		);
	}

	return (
		<Container>
			<AdminUrlsTable urls={urls} />
		</Container>
	);
}
