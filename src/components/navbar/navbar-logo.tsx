import Link from 'next/link';
import { Blinky } from '../blinky';

export function NavbarLogo() {
	return (
		<Link href='/'>
			<div className='flex gap-x-4 rounded px-2 py-2 transition-colors hover:bg-neutral-700 active:bg-neutral-600'>
				<Blinky height={32} />

				<p className='text-white text-lg self-center'>Blinky</p>
			</div>
		</Link>
	);
}
