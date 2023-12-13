'use client';

import { ApiKeyContext } from '@/contexts/api-key-context';
import { useApiKey } from '@/hooks/use-api-key';
import { useContext } from 'react';

export function ApiKeyInput() {
	const apiKey = useApiKey();
	const apiKeyContext = useContext(ApiKeyContext);

	return (
		<input
			type='password'
			value={apiKey}
			placeholder='API Key'
			className='transition-all h-14 rounded p-4 outline-none bg-neutral-800 shadow w-full md:w-auto'
			onChange={(event) => {
				apiKeyContext.setApiKey(event.target.value);
			}}
		/>
	);
}
