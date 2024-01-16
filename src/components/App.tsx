import './fetch-excel';

import React, { FC } from 'react';
import { createHashRouter, redirect, RouterProvider } from 'react-router-dom';

import { KolKolibri, KolLink } from '@public-ui/react';

import packageJson from '../../package.json';
import { Catalog } from '../data/catalog';
import { RequirenmentSetup } from '../data/setup';
import DataService from '../services/data';
import { Configurator } from './Configurator';
import './fetch-excel';
import { Results } from './Results';
import configurationService from '../services/configuration';
import initLocales from '../services/i18n';
import glossary from '../services/glossary';

const scrollToTop = () => {
	setTimeout(() => {
		window.scrollTo({
			behavior: 'smooth',
			left: 0,
			top: 0,
		});
	}, 500);
	setTimeout(() => {
		(document.querySelector('kol-details') as HTMLElement)?.focus();
	}, 500);
};

const router = createHashRouter([
	{
		path: '/',
		loader: () => {
			scrollToTop();
			return {};
		},
		element: <Configurator />,
	},
	{
		path: '/results',
		loader: async ({ request }) => {
			await Promise.all([configurationService.init(), initLocales(), glossary.init()]);
			const url = new URL(request.url);
			const q = url.searchParams;

			const dataService = new DataService();
			await dataService.loadData();

			scrollToTop();

			return { catalog: new Catalog(RequirenmentSetup.fromQueryParams(q), dataService) };
		},
		element: <Results />,
	},
	{
		// 404
		path: '*',
		loader: () => {
			return redirect('/');
		},
	},
]);

export const App: FC = () => {
	// const { t } = useTranslation();

	return (
		<div className="bpa container mx-auto max-w-768px p-4" data-theme="bpa">
			<div className="p-4 shadow-lg rounded flex flex-col gap-2" data-theme="bpa">
				{/* <KolHeading className="border-0 border-b border-style-solid mb-2 pb-2 border-gray-400 block" _label={t('appTitle')}></KolHeading> */}
				<RouterProvider router={router} />
			</div>
			<p className="m-6 mb-0 text-gray-500 grid gap-2 sm:grid-cols-[1fr_auto] text-center">
				<span className="mr-2 inline-flex gap-2 place-center sm:text-left">
					<KolKolibri className="inline-flex h-12 -mt-2" _labeled={false} />
					<span>
						Technische Realisierung mit <KolLink _href="https://public-ui.github.io" _label="KoliBri" /> vom{' '}
						<KolLink _href="https://itzbund.de" _label="ITZBund" />
					</span>
				</span>
				<span>Version {packageJson.version}</span>
			</p>
		</div>
	);
};
