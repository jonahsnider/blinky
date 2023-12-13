import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { useApiKey } from '@/hooks/use-api-key';
import { HttpError } from '@/swr';
import { ArrowPathIcon, FaceFrownIcon, MinusCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useState } from 'react';
import { mutate } from 'swr';

type Props = {
	url: ShortenedUrl;
	visisble: boolean;
};

export function DeleteButton({ url, visisble }: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const apiKey = useApiKey();

	const onClick = () => {
		setIsLoading(true);
		setIsError(false);

		fetch(`/api/v1/urls/${encodeURIComponent(url.shortened)}`, {
			method: 'DELETE',
			headers: {
				authorization: `Bearer ${apiKey}`,
			},
		})
			.then(async (response) => {
				if (!response.ok) {
					throw await HttpError.create(response);
				}
			})
			.catch(() => {
				setIsError(true);
				// Only set loading to false on error, so that the button doesn't enable right before being un-rendered
				setIsLoading(false);
			})
			.finally(() => {
				mutate(['/api/v1/urls', apiKey]);
				mutate(`/api/v1/urls/${encodeURIComponent(url.shortened)}`);
			});
	};

	let icon = <MinusCircleIcon className='w-6 h-6' />;

	if (isLoading) {
		icon = <ArrowPathIcon className='w-6 h-6 animate-spin' />;
	} else if (isError) {
		icon = <FaceFrownIcon className='w-6 h-6' />;
	}

	return (
		<button
			title='Delete'
			disabled={isLoading || !visisble}
			className={clsx(
				'rounded p-1 bg-neutral-700 text-red-400 hover:bg-red-400 hover:text-black transition-colors disabled:bg-neutral-700 disabled:text-white',
				{
					hidden: !visisble,
				},
			)}
			type='button'
			onClick={onClick}
		>
			{icon}{' '}
		</button>
	);
}
