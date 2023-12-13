import { ArrowPathIcon, CheckIcon, ClipboardDocumentIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export type State = 'ready' | 'invalid' | 'loading' | 'success' | 'error';

type Props = PropsWithChildren<{
	onClick: () => void;
	state: State;
	result?: string;
}>;

function ButtonContents({
	state,
	copy,
	children,
}: PropsWithChildren<{ state: State; copy: boolean }>): React.ReactNode {
	switch (state) {
		case 'error':
			return <ExclamationCircleIcon className='h-6' />;
		case 'loading':
			return <ArrowPathIcon className='h-6 animate-spin' />;
		case 'success':
			return copy ? <ClipboardDocumentIcon className='h-6' /> : <CheckIcon className='h-6' />;
		case 'ready':
		case 'invalid':
			return children;
	}
}

export function SubmitButton({ onClick, children, state, result }: Props) {
	const disabled = state === 'loading' || state === 'invalid';

	return (
		<button
			className={clsx(
				'transition-all py-2 px-4 rounded shadow shadow-neutral-900 disabled:shadow-none flex justify-center',
				{
					'bg-green-400 hover:bg-green-300 active:bg-green-200 text-black': state === 'ready' || state === 'success',
					'bg-red-400 hover:bg-red-300 active:bg-red-200 text-black': state === 'error',
					'bg-neutral-600 text-neutral-400': state === 'loading' || state === 'invalid',
				},
			)}
			onClick={result ? () => navigator.clipboard.writeText(result) : onClick}
			disabled={disabled}
			type='button'
		>
			<ButtonContents state={state} copy={Boolean(result)}>
				{children}
			</ButtonContents>
		</button>
	);
}
