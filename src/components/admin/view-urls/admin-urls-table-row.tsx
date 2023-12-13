import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { capitalize } from '@jonahsnider/util';
import { formatDistanceToNow, formatRelative } from 'date-fns';
import { useState } from 'react';
import { CopyButton } from './buttons/copy-button';
import { DeleteButton } from './buttons/delete-button';
import { EditButton } from './buttons/edit-button';
import { ResetButton } from './buttons/reset-button';

type Props = {
	url: ShortenedUrl;
};

export function AdminUrlsTableRow({ url }: Props) {
	const [longUrl, setLongUrl] = useState(url.url);
	const [shortened, setShortened] = useState(url.shortened);
	const urlEdited = longUrl !== url.url || shortened !== url.shortened;

	const onReset = () => {
		setLongUrl(url.url);
		setShortened(url.shortened);
	};

	return (
		<div className='grid grid-cols-4 gap-x-2'>
			<input
				className='col-span-1 bg-transparent outline-none hover:bg-neutral-700 rounded py-1 transition-all px-2 w-full'
				value={shortened}
				type='text'
				onChange={(event) => setShortened(event.target.value)}
			/>
			<div className='col-span-2 flex justify-between gap-x-2'>
				<input
					className='truncate bg-transparent outline-none hover:bg-neutral-700 rounded py-1 transition-all px-2 w-full'
					value={longUrl}
					type='url'
					onChange={(event) => setLongUrl(event.target.value)}
				/>
				<div className='flex gap-x-2'>
					<ResetButton onClick={onReset} visible={urlEdited} />
					<EditButton currentUrl={longUrl} currentShortened={shortened} url={url} visible={urlEdited} />
					<DeleteButton url={url} visisble={!urlEdited} />
					<CopyButton url={url} />
				</div>
			</div>

			<div className='col-span-1 justify-end items-center flex'>
				<p title={capitalize(formatRelative(new Date(url.createdAt), new Date()))}>
					{capitalize(formatDistanceToNow(new Date(url.createdAt)))} ago
				</p>
			</div>
		</div>
	);
}
