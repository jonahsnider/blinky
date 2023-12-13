import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

type Props = {
	visible: boolean;
	onClick: () => void;
};

export function ResetButton({ onClick, visible }: Props) {
	return (
		<button
			title='Revert changes'
			disabled={!visible}
			className={clsx(
				'rounded p-1 text-red-400 hover:bg-red-400 bg-neutral-700 hover:text-black transition-all disabled:bg-neutral-700 disabled:text-white',
				{
					'opacity-0': !visible,
				},
			)}
			type='button'
			onClick={onClick}
		>
			<ArrowUturnLeftIcon className='w-6 h-6' />
		</button>
	);
}
