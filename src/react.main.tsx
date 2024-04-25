import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { KoliBriDevHelper, register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/themes';

import { App } from './components/App';
import configurationService from './services/configuration';
import glossary from './services/glossary';
import initLocales from './services/i18n';

void (async () => {
	try {
		await register([DEFAULT], defineCustomElements);

		KoliBriDevHelper.patchThemeTag(
			'default',
			'GLOBAL',
			`
			.hint {
				// color: #6B6B7B;
				color: #595959;
			}`,
			{
				append: true,
			},
		);
		KoliBriDevHelper.patchThemeTag(
			'default',
			'KOL-ACCORDION',
			`
			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				margin: 0;
				padding: 0;
			}`,
			{
				append: true,
			},
		);
		KoliBriDevHelper.patchThemeTag(
			'default',
			'KOL-INPUT-CHECKBOX',
			`
			.button .input-label { padding-right: 1rem; }
			.button .input-label .input-label-span {
				margin: auto auto;
				font-weight: 700;
			}

			`,
			{
				append: true,
			},
		);

		const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#bmi-stab-app');
		if (htmlElement instanceof HTMLElement) {
			const root = createRoot(htmlElement);
			await Promise.all([configurationService.init(), initLocales(), glossary.init()]);
			root.render(
				<StrictMode>
					<App />
				</StrictMode>,
			);
		}
	} catch (e) {
		console.error(e);
	}
})();
