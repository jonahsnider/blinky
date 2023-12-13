import { ShortenUrlForm } from '@/components/admin/shorten-url/shorten-url-form';
import { Blinky } from '@/components/blinky';

// biome-ignore lint/nursery/noDefaultExport: Pages must have a default export
export default function Home() {
	return (
		<div className='flex flex-col justify-between items-center md:p-24'>
			<main className='flex flex-col items-center justify-center gap-16 w-full py-4'>
				<Blinky width={128} height={128} />

				<ShortenUrlForm />
			</main>
		</div>
	);
}
