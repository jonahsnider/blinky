import { CreateUrl } from '@/api/urls/dtos/create-url.dto';
import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { useApiKey } from '@/hooks/use-api-key';
import { HttpError } from '@/swr';
import { ArrowPathIcon, CheckIcon, CloudArrowUpIcon, FaceFrownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';

type Props = {
	url: ShortenedUrl;
	currentUrl: string;
	currentShortened: string;
	visible: boolean;
};

export function EditButton({ url, currentUrl, currentShortened, visible }: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const apiKey = useApiKey();

	const onClick = () => {
		setIsLoading(true);
		setIsError(false);

		fetch(`/api/v1/urls/${encodeURIComponent(url.shortened)}`, {
			method: 'PUT',
			headers: {
				authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({ url: currentUrl, shortened: currentShortened } satisfies CreateUrl),
		})
			.then(async (response) => {
				if (!response.ok) {
					throw await HttpError.create(response);
				}

				setIsSuccess(true);
			})
			.catch(() => {
				setIsLoading(false);
				setIsError(true);
			})
			.finally(() => {
				mutate(['/api/v1/urls', apiKey]);
				mutate(`/api/v1/urls/${encodeURIComponent(url.shortened)}`);
			});
	};

	useEffect(() => {
		if (visible) {
			setIsLoading(false);
		} else {
			setIsSuccess(false);
			setIsError(false);
		}
	}, [visible]);

	let icon = <CloudArrowUpIcon className='w-6 h-6' />;

	if (isLoading) {
		icon = <ArrowPathIcon className='w-6 h-6 animate-spin' />;
	} else if (isError) {
		icon = <FaceFrownIcon className='w-6 h-6' />;
	} else if (isSuccess) {
		icon = <CheckIcon className='w-6 h-6' />;
	}

	return (
		<button
			title='Save changes'
			disabled={isLoading || isSuccess || !visible}
			className={clsx(
				'rounded p-1 bg-neutral-700 hover:text-black transition-all disabled:bg-neutral-700 disabled:text-white',
				{
					'text-green-400 hover:bg-green-400': !isError,
					'text-red-400 hover:bg-red-400': isError,
					'opacity-0': !visible,
				},
			)}
			type='button'
			onClick={onClick}
		>
			{icon}{' '}
		</button>
	);
}
