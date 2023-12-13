import { NavbarLink } from './navbar-link';
import { NavbarLogo } from './navbar-logo';

const DEFAULT_NAVBAR_ITEMS = [
	{
		content: 'Admin',
		href: '/admin',
	},
];

export function Navbar() {
	return (
		<nav className='bg-neutral-800 shadow-lg px-4 py-2 flex justify-center'>
			<div className='flex justify-between w-full max-w-4xl'>
				<NavbarLogo />

				<ul className='flex flex-row gap-x-2'>
					{DEFAULT_NAVBAR_ITEMS.map((item) => (
						<NavbarLink key={item.content} item={item} />
					))}
				</ul>
			</div>
		</nav>
	);
}
