import i18next, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

const initLocales = async () => {
	const response = await fetch('locales/de.json');
	const resources = (await response.json()) as Resource;
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
