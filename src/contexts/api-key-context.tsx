import { PropsWithChildren, createContext, useEffect, useMemo, useState } from 'react';

type ContextValue = {
	apiKey: string;
	setApiKey: (apiKey: string) => void;
};

export const ApiKeyContext = createContext<ContextValue>({
	apiKey: '',
	// biome-ignore lint/nursery/noEmptyBlockStatements: This is a no-op function
	setApiKey: () => {},
});

export function ApiKeyProvider({ children }: PropsWithChildren) {
	const [apiKey, setApiKey] = useState('');

	useEffect(() => {
		const rawApiKey = globalThis.window?.localStorage.getItem('apiKey') ?? undefined;

		setApiKey(rawApiKey ?? '');
	}, []);

	const onChange = useMemo(
		() =>
			(key: string | undefined): void => {
				if (key) {
					globalThis.window?.localStorage.setItem('apiKey', key);
				} else {
					globalThis.window?.localStorage.removeItem('apiKey');
				}
				setApiKey(key ?? '');
			},
		[],
	);

	const contextValue = useMemo(() => ({ apiKey, setApiKey: onChange }), [apiKey, onChange]);

	return <ApiKeyContext.Provider value={contextValue}>{children}</ApiKeyContext.Provider>;
}
