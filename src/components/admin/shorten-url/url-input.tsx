'use client';

import { UrlSchema } from '@/api/urls/dtos/create-url.dto';
import clsx from 'clsx';

type Props = {
	url: string;
	onChange: (urlRaw: string) => void;
	onValidChange: (url: UrlSchema | undefined) => void;
	className?: string;
};

export function UrlInput({ onChange, onValidChange, className, url }: Props) {
	const valid = url === '' || UrlSchema.safeParse(url).success;

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
				placeholder='https://example.com'
				type='url'
				name='url'
				onChange={(event) => {
					onChange(event.target.value);

					const parsed = UrlSchema.safeParse(event.target.value);

					if (parsed.success) {
						onValidChange(parsed.data);
					} else {
						onValidChange(undefined);
					}
				}}
				value={url}
			/>
		</div>
	);
}
