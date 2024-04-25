import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { KoliBriDevHelper, register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { DEFAULT } from '@public-ui/themes';
import { App } from './components/App';
import configurationService from './services/configuration';
import glossary from './services/glossary';
import initLocales from './services/i18n';
import { GLOBALS } from './services/globals';

void (async () => {
	try {
		await register([DEFAULT], defineCustomElements);

		KoliBriDevHelper.patchThemeTag(
			'default',
			'GLOBAL',
			`:host {
				--border-radius: var(--kolibri-border-radius, 5px);
				--font-family: var(--kolibri-font-family, BundesSans Web, Calibri, Verdana, Arial, Helvetica, sans-serif);
				--font-size: var(--kolibri-font-size, 1rem);
				--spacing: var(--kolibri-spacing, 0.25rem);
				--border-width: var(--kolibri-border-width, 1px);
				--color-primary: var(--kolibri-color-primary, #004b76);
				--color-primary-variant: var(--kolibri-color-primary-variant, #0077b6);
				--color-danger: var(--kolibri-color-danger, #c0003c);
				--color-warning: var(--kolibri-color-warning, #c44931);
				--color-success: var(--kolibri-color-success, #005c45);
				--color-subtle: var(--kolibri-color-subtle, #576164);
				--color-light: var(--kolibri-color-light, #ffffff);
				--color-text: var(--kolibri-color-text, #202020);
				--color-mute: var(--kolibri-color-mute, #f2f3f4);
				--color-mute-variant: var(--kolibri-color-mute-variant, #bec5c9);
			}
			:host {
				font-family: var(--font-family);
				font-size: var(--font-size);
			}
			* {
				box-sizing: border-box;
			}
			*:not(i) {
				font-family: var(--font-family);
			}
			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				margin: 0;
				padding: 0;
			}
			h1 {
				padding-top: 0.5rem;
			}
			h2 {
				padding-top: 0.75rem;
			}
			h3 {
				padding-top: 1rem;
			}
			h4 {
				padding-top: 1rem;
			}
			kol-alert-wc :is(h1,h2,h3,h4,h5,h6) {
				padding-top: 0;
			}
			*[tabindex]:focus,
			kol-input:not(.checkbox, .radio) .input:focus-within,
			kol-input:is(.checkbox, .radio) input:focus,
			summary:focus {
				cursor: pointer;
				outline-color: var(--color-primary-variant);
				outline-offset: 2px;
				outline-style: solid;
				outline-width: 3px;
				transition: outline-offset 0.2s linear;
			}
			kol-heading-wc {
				font-weight: 700;
			}
			kol-tooltip-wc .tooltip-floating {
				border: var(--border-width) solid var(--color-subtle);
				border-radius: var(--border-radius);
			}
			kol-tooltip-wc .tooltip-arrow {
				border: var(--border-width) solid var(--color-subtle);
			}
			kol-tooltip-wc .tooltip-area {
				background-color: var(--color-light);
			}
			kol-tooltip-wc .tooltip-content {
				border-radius: var(--border-radius);
				line-height: 1.5;
				padding: 0.5rem 0.75rem;
			}
			kol-span-wc,
			kol-span-wc > span {
				gap: 0.5rem;
			}

			@keyframes spin {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}
			.hint {
				// color: #6B6B7B;
				color: #595959;
			}`,
		);
		KoliBriDevHelper.patchThemeTag(
			'default',
			'KOL-ACCORDION',
			`
			kol-span-wc > span {
				display: flex;
				place-items: baseline center;
				text-align: left;
			}
			:host > div > kol-heading-wc button {
				border-radius: var(--border-radius);
				min-height: 2.2rem;
				padding: 12px 8px;
			}
			:host > div > kol-heading-wc button kol-span-wc {
				font-weight: 700;
				font-size: 1.125rem;
				line-height: 1.1;
				gap: 0.5rem;
			}
			:host > div > kol-heading-wc button kol-span-wc > span {
				gap: 0.5em;
			}
			:host > div > kol-heading-wc button kol-icon {
				color: var(--color-primary);
			}
			:host > div {
				width: 100%;
				height: 100%;
				display: grid;
			}
			:host > div div[class='header'],
			:host > div[class*='open'] div[class='content'] {
				margin: 0;
			}
			:host > div div[class='content'] {
				padding-left: 2.25em;
				padding-bottom: 12px;
				padding-right: 8px;
			}
			button:focus {
				outline: none;
			}
			:host > .accordion:focus-within {
				border-radius: var(--border-radius);
				cursor: pointer;
				outline-color: var(--color-primary-variant);
				outline-offset: 2px;
				outline-style: solid;
				outline-width: 3px;
				transition: outline-offset 0.2s linear;
			}
			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
				margin: 0;
				padding: 0;
			}`,
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

		const cmsLocation: HTMLElement | null = document.querySelector<HTMLDivElement>('#content .c-content-stage');
		if (cmsLocation instanceof HTMLElement) {
			const div = document.createElement('div');
			div.setAttribute('shadowroot', 'open');
			div.setAttribute('id', 'bmi-standardanforderungskatalog-app');
			cmsLocation.parentNode?.insertBefore(div, cmsLocation.nextSibling);
		}

		const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#bmi-standardanforderungskatalog-app');
		if (htmlElement instanceof HTMLElement) {
			const root = createRoot(htmlElement);
			const baseUriConfig = htmlElement.dataset.baseUriConfig ?? 'https://medien.bmi.bund.de/bmi02/standardanforderungskatalog/';
			GLOBALS.set('baseUriConfig', baseUriConfig);
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
