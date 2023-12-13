'use client';

import { CreateUrl, ShortenedSchema, UrlSchema } from '@/api/urls/dtos/create-url.dto';
import { ShortenedUrl } from '@/api/urls/dtos/shortened-url.dto';
import { H2 } from '@/components/headings/h2';
import { ApiKeyProvider } from '@/contexts/api-key-context';
import { useApiKey } from '@/hooks/use-api-key';
import { useEffect, useState } from 'react';
import { ApiKeyInput } from '../api-key-input';
import { ShortenedInput } from './shortened-input';
import { State, SubmitButton } from './submit-button';
import { UrlInput } from './url-input';

function determineState({
	isError,
	isLoading,
	isReady,
	isSuccess,
}: {
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	isReady: boolean;
}): State {
	if (isLoading) {
		return 'loading';
	}
	if (isError) {
		return 'error';
	}
	if (isSuccess) {
		return 'success';
	}
	if (isReady) {
		return 'ready';
	}

	return 'invalid';
}

function ShortenUrlForm() {
	const apiKey = useApiKey();

	const [rawUrl, setRawUrl] = useState('');
	const [url, setUrl] = useState<UrlSchema | undefined>(undefined);

	const [rawShortened, setRawShortened] = useState('');
	const [shortened, setShortened] = useState<ShortenedSchema | undefined>(undefined);

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [result, setResult] = useState<ShortenedUrl | undefined>(undefined);

	const body = CreateUrl.safeParse({
		url,
		shortened,
	});

	const isReady = body.success;

	const state = determineState({ isError, isLoading, isReady, isSuccess });

	useEffect(() => {
		if (result && (result.shortened !== rawShortened || result.url !== rawUrl)) {
			setIsLoading(false);
			setIsError(false);
			setIsSuccess(false);
		}
	}, [result, rawShortened, rawUrl]);

	const onClick = () => {
		if (!isReady) {
			return;
		}

		setIsLoading(true);
		setIsError(false);
		setIsSuccess(false);

		fetch('/api/v1/urls', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify(body.data),
		})
			.then(async (res) => {
				if (!res.ok) {
					throw new Error('Failed to create URL');
				}

				const parsed = ShortenedUrl.parse(await res.json());

				setResult(parsed);
			})
			.then(() => {
				setIsSuccess(true);
			})
			.catch(() => {
				setIsError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<>
			<div className='flex flex-col gap-2'>
				<H2>API key</H2>
				<ApiKeyInput />
			</div>
			{apiKey && (
				<div className='bg-neutral-800 rounded p-4 flex flex-col gap-6 w-full md:w-auto'>
					<p className='text-lg font-bold'>Create URL</p>

					<div className='flex flex-col gap-1'>
						<p>Long URL</p>

						<UrlInput onChange={setRawUrl} onValidChange={setUrl} url={rawUrl} />
					</div>

					<div className='flex flex-col gap-1'>
						<p>Shortened</p>

						<ShortenedInput onChange={setRawShortened} onValidChange={setShortened} shortened={rawShortened} />
					</div>

					<SubmitButton onClick={onClick} state={state} result={result?.outputUrl ?? undefined}>
						Create
					</SubmitButton>
				</div>
			)}
		</>
	);
}

function WithContext() {
	return (
		<ApiKeyProvider>
			<ShortenUrlForm />
		</ApiKeyProvider>
	);
}

export { WithContext as ShortenUrlForm };
