import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid';

type Props = {
	url: ShortenedUrl;
};

export function CopyButton({ url }: Props) {
	const currentBaseUrl = new URL(window.location.href);
	currentBaseUrl.pathname = '';

	return (
		<button
			className='rounded p-1 bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-500 transition-all'
			type='button'
			title='Copy URL'
			onClick={() => navigator.clipboard.writeText(url.outputUrl ?? new URL(url.shortened, currentBaseUrl).href)}
		>
			<ClipboardDocumentIcon className='h-6 w-6' />
		</button>
	);
}
