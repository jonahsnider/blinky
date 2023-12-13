import { Navbar } from '@/components/navbar/navbar';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Blinky',
	description: 'Short URL manager',
};

// biome-ignore lint/nursery/noDefaultExport: Pages must have a default export
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={clsx(inter.className, 'bg-neutral-900 text-white flex flex-col min-h-screen')}>
				<Navbar />
				<div className='mx-auto container px-2'>{children}</div>
			</body>
		</html>
	);
}
