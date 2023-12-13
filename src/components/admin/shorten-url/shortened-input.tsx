'use client';

import { ShortenedSchema } from '@/api/urls/dtos/create-url.dto';
import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { fetcher } from '@/swr';
import clsx from 'clsx';
import { useState } from 'react';
import useSwr from 'swr';

type Props = {
	shortened: string;
	onChange: (urlRaw: string) => void;
	onValidChange: (url: ShortenedSchema | undefined) => void;
	className?: string;
};

export function ShortenedInput({ onChange, onValidChange, className, shortened }: Props) {
	const { data: existingShortened } = useSwr<ShortenedUrl>(`/api/v1/urls/${shortened}`, {
		fetcher: shortened === '' ? undefined : fetcher,
	});
	const [lastValid, setLastValid] = useState<string | undefined>(undefined);
	const valid =
		shortened === '' ||
		(ShortenedSchema.safeParse(shortened).success && (!existingShortened || existingShortened.shortened === lastValid));

	return (
		<div className={clsx('rounded relative w-full md:w-auto md:max-w-min bg-neutral-700', className)}>
			<input
				className={clsx(
					'w-full md:w-auto transition-all h-16 rounded p-4 outline-none border-4 bg-transparent',
					{
						'border-red-400': !valid,
						'border-transparent': valid,
					},
					className,
				)}
				placeholder='cad-training'
				type='text'
				name='shortened'
				onChange={(event) => {
					onChange(event.target.value);

					const parsed = ShortenedSchema.safeParse(event.target.value);

					if (parsed.success) {
						onValidChange(parsed.data);
						setLastValid(parsed.data);
					} else {
						onValidChange(undefined);
					}
				}}
				value={shortened}
			/>
		</div>
	);
}
