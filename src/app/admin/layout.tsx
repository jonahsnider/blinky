'use client';

import { H1 } from '@/components/headings/h1';
import { ApiKeyProvider } from '@/contexts/api-key-context';
import { PropsWithChildren } from 'react';

// biome-ignore lint/nursery/noDefaultExport: Pages must have a default export
export default function AdminLayout({ children }: PropsWithChildren) {
	return (
		<ApiKeyProvider>
			<div className='flex flex-col items-center lg:pt-[10vh]'>
				<H1>Admin</H1>

				{children}
			</div>
		</ApiKeyProvider>
	);
}
