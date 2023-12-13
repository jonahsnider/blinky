'use client';

import { ApiKeyContext } from '@/contexts/api-key-context';
import { useContext } from 'react';

export function useApiKey(): string {
	const apiKeyContext = useContext(ApiKeyContext);

	return apiKeyContext.apiKey;
}
