import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { AdminUrlsTableRow } from './admin-urls-table-row';

type Props = {
	urls: readonly ShortenedUrl[];
};

export function AdminUrlsTable({ urls }: Props) {
	return (
		<div className='flex flex-col gap-x-4 px-4 gap-y-2'>
			{urls.map((url) => (
				<AdminUrlsTableRow url={url} key={url.shortened} />
			))}
		</div>
	);
}
