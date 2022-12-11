import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
	key: string,
	initialValue: T | (() => T)
) => {
	const [value, setValue] = useState<T>(() => {
		try {
			const jsonValue = window.localStorage.getItem(key);

			if (jsonValue) return JSON.parse(jsonValue);

			if (initialValue instanceof Function) return initialValue();

			return initialValue;
		} catch (error) {
			console.error(error);
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue] as [T, typeof setValue];
};
