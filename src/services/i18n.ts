import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { fetchLocalesDe } from './globals';

const initLocales = async () => {
	// const baseUri: string = (GLOBALS.get('baseUriConfig') as string) ?? '';
	// const response = await fetch(`${baseUri}locales/de.json`);
	// const resources = (await response.json()) as Resource;
	const resources = (await fetchLocalesDe()) as Resource;
	const instance = i18next.createInstance();

	await instance.use(initReactI18next).init({
		lng: 'de',
		fallbackLng: 'de',
		resources: {
			de: {
				translation: resources,
			},
		},
		saveMissing: true,
	});

	instance.on('missingKey', (_, _2, key) => {
		console.warn(`Missing translation key: ${key}`);
	});
};
export default initLocales;
