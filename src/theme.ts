import { KoliBri } from '@public-ui/schema';

export const rescaleRem = (value: number, original = 16, production = 10) => `${(value / production) * original}`;

export const DEFAULT = KoliBri.createTheme('default', {
	GLOBAL: `
		:host {
			--border-radius: var(--kolibri-border-radius, 5px);
			--font-family: var(--kolibri-font-family, BundesSans Web, Calibri, Verdana, Arial, Helvetica, sans-serif);
			--font-size: var(--kolibri-font-size, 16px);
			--spacing: var(--kolibri-spacing, ${rescaleRem(0.25)}rem);
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
			padding: ${rescaleRem(0.5)}rem ${rescaleRem(0.75)}rem;
		}
		kol-span-wc,
		kol-span-wc > span {
			gap: ${rescaleRem(0.5)}rem;
		}

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
		/* PATCH */
		.hint {
			// color: #6B6B7B;
			color: #595959;
		}
	`,
	'KOL-BUTTON': `
		:is(a, button):focus {
			outline: none;
		}
		:is(a, button):focus kol-span-wc {
			outline-color: var(--color-primary-variant);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: calc(var(--border-width) * 2);
			transition: outline-offset 0.2s linear;
		}
		:is(a, button) > kol-span-wc {
			font-weight: 700;
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: var(--border-width);
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			padding: 8px 14px;
			text-align: center;
			transition-duration: 0.5s;
			transition-property: background-color, color, border-color;
		}
		:is(a, button):disabled > kol-span-wc {
			cursor: not-allowed;
			opacity: 0.5;
		}
		.primary :is(a, button) > kol-span-wc,
		.primary :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-primary);
			border-color: var(--color-primary);
			color: var(--color-light);
		}
		.secondary :is(a, button) > kol-span-wc,
		.secondary :is(a, button):disabled:hover > kol-span-wc,
		.normal :is(a, button) > kol-span-wc,
		.normal :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-light);
			border-color: var(--color-primary);
			color: var(--color-primary);
		}
		.danger :is(a, button) > kol-span-wc,
		.danger :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-danger);
			border-color: var(--color-danger);
			color: var(--color-light);
		}
		.ghost :is(a, button) > kol-span-wc,
		.ghost :is(a, button):disabled:hover > kol-span-wc {
			border-color: var(--color-light);
			background-color: var(--color-light);
			box-shadow: none;
			color: var(--color-primary);
		} /*-----------*/
		.primary :is(a, button):active > kol-span-wc,
		.primary :is(a, button):hover > kol-span-wc,
		.secondary :is(a, button):active > kol-span-wc,
		.secondary :is(a, button):hover > kol-span-wc,
		.normal :is(a, button):active > kol-span-wc,
		.normal :is(a, button):hover > kol-span-wc,
		.danger :is(a, button):active > kol-span-wc,
		.danger :is(a, button):hover > kol-span-wc,
		.ghost :is(a, button):active > kol-span-wc,
		.ghost :is(a, button):hover > kol-span-wc {
			background-color: var(--color-primary-variant);
			border-color: var(--color-primary-variant);
			box-shadow: 0 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-light);
		}
		.danger :is(a, button):active > kol-span-wc,
		.danger :is(a, button):hover > kol-span-wc {
			background-color: var(--color-danger);
			border-color: var(--color-danger);
		}
		:is(a, button):disabled:hover > kol-span-wc,
		:is(a, button):focus:hover > kol-span-wc {
			box-shadow: none;
		}
		.primary :is(a, button):active > kol-span-wc,
		.secondary :is(a, button):active > kol-span-wc,
		.normal :is(a, button):active > kol-span-wc,
		.danger :is(a, button):active > kol-span-wc,
		.ghost :is(a, button):active > kol-span-wc {
			border-color: var(--color-light);
			box-shadow: none;
			outline: none;
		}
		:is(a, button).hide-label > kol-span-wc {
			padding: ${rescaleRem(0.8)}rem;
			width: unset;
		}
		:is(a, button).hide-label > kol-span-wc > span > span {
			display: none;
		}
		:is(a, button).loading > kol-span-wc kol-icon {
			animation: spin 5s infinite linear;
		}
		/** small ghost button */
		.ghost :is(a, button).small > kol-span-wc {
			border: none;
			background-color: transparent;
			box-shadow: none;
		}
		.ghost :is(a, button).small > kol-span-wc > span {
			border-radius: 1.5em;
			border-style: solid;
			border-width: var(--border-width);
			border-color: var(--color-light);
			background-color: var(--color-light);
		}
		.ghost :is(a, button).small:active > kol-span-wc > span,
		.ghost :is(a, button).small:hover > kol-span-wc > span,
		.ghost :is(a, button).small.transparent:active > kol-span-wc > span,
		.ghost :is(a, button).small.transparent:hover > kol-span-wc > span {
			background-color: var(--color-primary-variant);
			border-color: var(--color-primary-variant);
			box-shadow: 0 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-light);
		} /** :is(a,button) with transparent background */
		:is(a, button).transparent > kol-span-wc > span,
		.ghost :is(a, button).small.transparent > kol-span-wc > span,
		:is(a, button).transparent > kol-span-wc {
			background-color: transparent;
			border-color: transparent;
		}
	`,
	'KOL-INPUT-TEXT': `
		kol-input {
			gap: ${rescaleRem(0.25)}rem;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: ${rescaleRem(0.9)}rem;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 ${rescaleRem(0.5)}rem;
		}
		.input > kol-icon {
			width: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: ${rescaleRem(1)}rem;
			padding-right: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: ${rescaleRem(0.5)}rem;
			padding-right: ${rescaleRem(0.5)}rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: ${rescaleRem(1)}rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(input, label) {
			opacity: 1;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
		}
	`,
	'KOL-INPUT-PASSWORD': `
		kol-input {
			gap: ${rescaleRem(0.25)}rem;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: ${rescaleRem(0.9)}rem;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 ${rescaleRem(0.5)}rem;
		}
		.input > kol-icon {
			width: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: ${rescaleRem(1)}rem;
			padding-right: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: ${rescaleRem(0.5)}rem;
			padding-right: ${rescaleRem(0.5)}rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: ${rescaleRem(1)}rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(button, input, label, option, select, textarea) {
			opacity: 1;
		}
		kol-input.disabled :is(input, select, textarea, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-INPUT-NUMBER': `
		kol-input {
			gap: ${rescaleRem(0.25)}rem;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: ${rescaleRem(0.9)}rem;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 ${rescaleRem(0.5)}rem;
		}
		.input > kol-icon {
			width: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: ${rescaleRem(1)}rem;
			padding-right: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: ${rescaleRem(0.5)}rem;
			padding-right: ${rescaleRem(0.5)}rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: ${rescaleRem(1)}rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(input, label) {
			opacity: 1;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-INPUT-DATE': `
		kol-input {
			gap: ${rescaleRem(0.25)}rem;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: ${rescaleRem(0.9)}rem;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 ${rescaleRem(0.5)}rem;
		}
		.input > kol-icon {
			width: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: ${rescaleRem(1)}rem;
			padding-right: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: ${rescaleRem(0.5)}rem;
			padding-right: ${rescaleRem(0.5)}rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: ${rescaleRem(1)}rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(input, label) {
			opacity: 1;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-INPUT-EMAIL': `
		kol-input {
			gap: ${rescaleRem(0.25)}rem;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: ${rescaleRem(0.9)}rem;
			font-style: italic;
		}
		input {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 ${rescaleRem(0.5)}rem;
		}
		.input > kol-icon {
			width: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: ${rescaleRem(1)}rem;
			padding-right: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: ${rescaleRem(0.5)}rem;
			padding-right: ${rescaleRem(0.5)}rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: ${rescaleRem(1)}rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(input, label) {
			opacity: 1;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-INPUT-FILE': `
		kol-input {
			gap: ${rescaleRem(0.25)}rem;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: ${rescaleRem(0.9)}rem;
			font-style: italic;
		}
		kol-input .input input[type='file'] {
			padding-top: calc(0.5em + 2px);
		}
		input {
			border: none;
		}
		input[type='file'] {
			background-color: transparent;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 ${rescaleRem(0.5)}rem;
		}
		.input > kol-icon {
			width: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: ${rescaleRem(1)}rem;
			padding-right: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: ${rescaleRem(0.5)}rem;
			padding-right: ${rescaleRem(0.5)}rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: ${rescaleRem(1)}rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(button, input, label, option, select, textarea) {
			opacity: 1;
		}
		kol-input.disabled :is(input, select, textarea, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-TEXTAREA': `
		kol-input {
			gap: ${rescaleRem(0.25)}rem;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .counter {
			order: 4;
		}
		kol-input .hint {
			order: 5;
			font-size: ${rescaleRem(0.9)}rem;
			font-style: italic;
		}
		textarea {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 ${rescaleRem(0.5)}rem;
		}
		.input > kol-icon {
			width: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: ${rescaleRem(1)}rem;
			padding-right: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: ${rescaleRem(0.5)}rem;
			padding-right: ${rescaleRem(0.5)}rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		textarea:read-only,
		textarea:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: ${rescaleRem(1)}rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		.disabled {
			opacity: 0.33;
		}
		select[multiple],
		textarea {
			overflow: auto;
		}
		textarea {
			display: block;
		}
		.input {
			position: relative;
		}
	`,
	'KOL-ALERT': `
		.msg {
			border-width: 0;
		}
		kol-alert-wc {
			border-width: var(--border-width);
			border-style: solid;
			border-radius: var(--border-radius);
			display: flex;
			width: 100%;
			overflow: unset;
			border-color: transparent;
			background-color: var(--color-light);
		}
		kol-alert-wc > .heading {
			display: flex;
			gap: 0.5em;
			place-items: center;
		}
		kol-alert-wc > .heading > div {
			display: grid;
			gap: ${rescaleRem(0.25)}rem;
		}
		.msg > .heading > kol-icon {
			place-self: baseline;
		}
		kol-alert-wc > .heading > kol-button-wc.close {
			place-self: center;
		}
		.msg {
			align-items: start;
		}
		.default {
			border-color: var(--color-subtle);
		}
		.default.msg .heading-icon {
			color: var(--color-subtle);
		}
		.error {
			border-color: var(--color-danger);
		}
		.error.msg .heading-icon {
			color: var(--color-danger);
		}
		.info {
			border-color: var(--color-primary);
		}
		.info.msg .heading-icon {
			color: var(--color-primary);
		}
		.success {
			border-color: var(--color-success);
		}
		.success.msg .heading-icon {
			color: var(--color-success);
		}
		.warning {
			border-color: var(--color-warning);
		}
		.warning.msg .heading-icon {
			color: var(--color-warning);
		}
		.heading-icon {
			color: var(--color-light);
		}
		kol-alert-wc .heading .heading-icon {
			padding: 0;
		}
		.msg > .heading > .heading-icon {
			padding-top: 0;
			place-items: baseline;
		}
		.msg > .heading > div > kol-heading-wc {
			padding-top: calc(--var-spacing / 2);
		}
		.msg.default .heading > div > kol-heading-wc {
			color: var(--color-subtle);
		}
		.msg.error .heading > div > kol-heading-wc {
			color: var(--color-danger);
		}
		.msg.info .heading > div > kol-heading-wc {
			color: var(--color-primary);
		}
		.msg.success .heading > div > kol-heading-wc {
			color: var(--color-success);
		}
		.msg.warning .heading > div > kol-heading-wc {
			color: var(--color-warning);
		}
		.msg.default .close .icon {
			color: var(--color-subtle);
		}
		.msg.error .close .icon {
			color: var(--color-danger);
		}
		.msg.info .close .icon {
			color: var(--color-primary);
		}
		.msg.success .close .icon {
			color: var(--color-success);
		}
		.msg.warning .close .icon {
			color: var(--color-warning);
		}
		.card {
			border-width: var(--border-width);
			border-style: solid;
			filter: drop-shadow(0px 2px 4px rgba(8, 35, 48, 0.24));
			flex-direction: column;
		}
		.card > .heading {
			padding: ${rescaleRem(0.5)}rem ${rescaleRem(1)}rem;
		}
		.card[_has-closer] > .heading {
			padding-top: 0;
			padding-bottom: 0;
			padding-right: 0;
		}
		.card > .heading > div {
			width: 100%;
			min-height: ${rescaleRem(1.25)}rem;
		}
		.card > .heading .heading-icon {
			justify-self: right;
			margin-top: -4px;
		}
		.card > .heading kol-heading-wc {
			width: 100%;
			color: var(--color-light);
			display: flex;
			font-size: ${rescaleRem(1.25)}rem;
			line-height: ${rescaleRem(1.25)}rem;
		}
		.card > .heading kol-heading-wc > * {
			margin: auto 0;
		}
		.card > .content {
			padding: ${rescaleRem(1)}rem;
		}
		.card.default > .heading {
			background-color: var(--color-subtle);
		}
		.card.error > .heading {
			background-color: var(--color-danger);
		}
		.card.info > .heading {
			background-color: var(--color-primary);
		}
		.card.success > .heading {
			background-color: var(--color-success);
		}
		.card.warning > .heading {
			background-color: var(--color-warning);
		}
		:is(.error, .info, .success, .warning) .heading-icon {
			font-size: ${rescaleRem(1.25)}rem;
		}
		.card > div > .content {
			grid-row: 2;
			grid-column: 1 / span 2;
		}
		.card.default .close {
			background-color: var(--color-subtle);
		}
		.card.error .close {
			background-color: var(--color-danger);
		}
		.card.info .close {
			background-color: var(--color-primary);
		}
		.card.success .close {
			background-color: var(--color-success);
		}
		.card.warning .close {
			background-color: var(--color-warning);
		}
		.close > button {
			border-radius: 50%; /* visible on focus */
			color: var(--color-light);
			cursor: pointer;
			height: var(--a11y-min-size);
			width: var(--a11y-min-size);
		}
		.close > button.hide-label kol-icon {
			display: flex;
			width: 1em;
			height: 1em;
			font-size: ${rescaleRem(1.2)}rem;
		}
		.close > button:active {
			box-shadow: none;
			outline: none;
		}
	`,
	'KOL-HEADING': `
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			color: inherit;
			font-style: normal;
		}
		h1,
		h2,
		h3 {
			font-weight: 700;
		}
		h1 {
			font-size: ${rescaleRem(1.5)}rem;
			line-height: ${rescaleRem(1.75)}rem;
		}
		h2 {
			font-size: ${rescaleRem(1.25)}rem;
			line-height: ${rescaleRem(1.75)}rem;
		}
		h3 {
			font-size: ${rescaleRem(1.125)}rem;
			line-height: ${rescaleRem(1.5)}rem;
		}
	`,
	'KOL-BADGE': `
		:host {
			display: inline-block;
			font-size: inherit;
		}
		:host > span {
			border-radius: var(--border-radius);
			display: inline-flex;
			font-style: normal;
		}
		:host > span.smart-button {
			align-items: center;
		}
		:host > span kol-button-wc:hover > button {
			background-color: var(--color-primary-variant);
			color: var(--color-light);
		}
		:host > span kol-button-wc > button {
			color: inherit;
			border-top-right-radius: var(--border-radius);
			border-bottom-right-radius: var(--border-radius);
			padding: ${rescaleRem(0.2)}rem;
		}
		:host > span kol-span-wc {
			padding: ${rescaleRem(0.25)}rem ${rescaleRem(0.75)}rem;
		}
		:host > span > kol-span-wc {
			align-items: center;
			font-style: normal;
			gap: ${rescaleRem(0.5)}rem;
		}
		:host > span > kol-span-wc > span {
			display: flex;
			gap: ${rescaleRem(0.25)}rem;
		}
	`,
	'KOL-BUTTON-GROUP': `
		:host > kol-button-group-wc {
			display: flex;
			flex-wrap: wrap;
			gap: var(--spacing);
		}
	`,
	'KOL-INDENTED-TEXT': `
		:host > div {
			background-color: var(--color-light);
			border-left: none;
			box-shadow: -2px 0px 0px var(--color-primary-variant);
			padding: 0 ${rescaleRem(0.5)}rem;
			width: 100%;
		}
	`,
	'KOL-LINK': `
		:is(a, button) {
			color: var(--color-primary);
			font-style: normal;
			font-weight: 400;
			text-decoration-line: underline;
		}
		:is(a, button):focus {
			outline: none;
		}
		:is(a, button):focus kol-span-wc {
			border-radius: var(--border-radius);
			outline: var(--border-width) solid;
		}
		:is(a, button):hover {
			text-decoration-thickness: 0.25em;
		}
		:is(a, button):visited {
			color: var(--visited);
		}
		.hidden {
			display: none;
			visibility: hidden;
		}
		.skip {
			left: -99999px;
			overflow: hidden;
			position: absolute;
			z-index: 9999999;
			line-height: 1em;
		}
		.skip:focus {
			background: white;
			left: unset;
			position: unset;
		}
	`,
	'KOL-DETAILS': `
		details > summary {
			border-radius: var(--border-radius);
		}
		details kol-indented-text {
			margin: ${rescaleRem(0.25)}rem 0 0 ${rescaleRem(0.65)}rem;
		}
		kol-icon {
			font-size: ${rescaleRem(1.2)}rem;
		}
	`,
	'KOL-SPIN': `
		.spin {
			display: inline-block;
			height: ${rescaleRem(1)}rem;
			position: relative;
			width: ${rescaleRem(3)}rem;
		}
		.spin span {
			animation-timing-function: cubic-bezier(0, 1, 1, 0);
			border: ${rescaleRem(0.1)}rem solid rgb(255, 255, 255);
			border-radius: 50%;
			height: ${rescaleRem(0.8)}rem;
			width: ${rescaleRem(0.8)}rem;
			top: ${rescaleRem(0.1)}rem;
			position: absolute;
		}
		.spin span:nth-child(1) {
			background-color: #fc0;
			z-index: 0;
			animation: 2s ease 0s infinite normal none running spin1;
			left: ${rescaleRem(0.1)}rem;
		}
		.spin span:nth-child(2) {
			background-color: #f00;
			z-index: 1;
			animation: 2s ease 0s infinite normal none running spin2;
			left: ${rescaleRem(0.1)}rem;
		}
		.spin span:nth-child(3) {
			background-color: #000;
			z-index: 1;
			animation: 2s ease 0s infinite normal none running spin2;
			left: ${rescaleRem(1.1)}rem;
		}
		.spin span:nth-child(4) {
			background-color: #666;
			z-index: 0;
			animation: 2s ease 0s infinite normal none running spin3;
			left: ${rescaleRem(2.1)}rem;
		}
		@keyframes spin1 {
			0% {
				transform: scale(0);
			}
			100% {
				transform: scale(1);
			}
		}
		@keyframes spin2 {
			0% {
				transform: translate(0px, 0px);
			}
			100% {
				transform: translate(${rescaleRem(1)}rem, 0px);
			}
		}
		@keyframes spin3 {
			0% {
				transform: scale(1);
			}
			100% {
				transform: scale(0);
			}
		}
	`,
	'KOL-PROGRESS': `
		:host progress,
		:host span {
			display: block;
			height: 0px;
			overflow: hidden;
			width: 0px;
		}
		:host svg line:first-child,
		:host svg circle:first-child {
			fill: transparent;
			stroke: var(--color-mute-variant);
		}
		:host svg line:last-child,
		:host svg circle:last-child {
			fill: transparent;
			stroke: var(--color-primary);
		}

		.cycle .progress {
			stroke: var(--color-primary-variant);
		}
	`,
	'KOL-SELECT': `
		kol-input {
			gap: ${rescaleRem(0.25)}rem;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: ${rescaleRem(0.9)}rem;
			font-style: italic;
		}
		select {
			border: none;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 ${rescaleRem(0.5)}rem;
		}
		.input > kol-icon {
			width: ${rescaleRem(2)}rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: ${rescaleRem(1)}rem;
			padding-right: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: ${rescaleRem(0.5)}rem;
			padding-right: ${rescaleRem(0.5)}rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		select:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: ${rescaleRem(1)}rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(select, label, option) {
			opacity: 1;
		}
		kol-input.disabled :is(select, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
		}
		select[multiple] {
			overflow: auto;
		}
		select option {
			margin: 1px 0;
			padding: 0.5em;
			border-radius: var(--border-radius);
			cursor: pointer;
		}
		select option:disabled {
			cursor: not-allowed;
		}
		option:active:not(:disabled),
		option:checked:not(:disabled),
		option:focus:not(:disabled),
		option:hover:not(:disabled) {
			background: var(--color-primary-variant);
			color: var(--color-light);
		}
	`,
	'KOL-INPUT-COLOR': `
		kol-input {
			gap: ${rescaleRem(0.25)}rem;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: ${rescaleRem(0.9)}rem;
			font-style: italic;
		}
		input {
			border: none;
		}
		input[type='color'] {
			border: none;
			min-height: 40px !important;
		}
		input[type='color'] {
			background-color: transparent;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 ${rescaleRem(0.5)}rem;
		}
		.input > kol-icon {
			width: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: ${rescaleRem(1)}rem;
			padding-right: ${rescaleRem(1)}rem;
		}
		.input:is(.icon-left, .icon-right) input {
			padding-left: ${rescaleRem(0.5)}rem;
			padding-right: ${rescaleRem(0.5)}rem;
		}
		.input > input:first-child {
			padding-left: var(--spacing);
		}
		.input > input:last-child {
			padding-right: var(--spacing);
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: ${rescaleRem(1)}rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(input, label) {
			opacity: 1;
		}
		kol-input.disabled :is(input, .input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-ACCORDION': `
		kol-span-wc > span {
			display: flex;
			place-items: baseline center;
			text-align: left;
		}
		:host > div > kol-heading-wc button {
			border-radius: var(--border-radius);
			min-height: ${rescaleRem(2.2)}rem;
			padding: 12px 8px;
		}
		:host > div > kol-heading-wc button kol-span-wc {
			font-weight: 700;
			font-size: ${rescaleRem(1.125)}rem;
			line-height: 20px;
			gap: ${rescaleRem(0.5)}rem;
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
		/* PATCH */
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin: 0;
			padding: 0;
		}
	`,
	'KOL-TABLE': `
		:host * {
			hyphens: var(--hyphens);
			font-family: var(--font-family);
			line-height: var(--line-height);
			word-break: break-word;
		}
		:host > div {
			overflow-x: auto;
			overflow-y: hidden;
		}
		caption {
			padding: ${rescaleRem(0.5)}rem;
		}
		th {
			font-weight: normal;
			color: var(--color-primary);
		}
		:host table thead tr:first-child th,
		:host table thead tr:first-child td {
			border-width: 0;
			border-top-width: calc(var(--border-width) * 2);
			border-style: solid;
			border-color: var(--color-primary-variant);
		}
		table {
			width: 100%;
			border-spacing: 0;
		}
		table,
		:host table thead tr:last-child th,
		:host table thead tr:last-child td {
			border-width: 0;
			border-bottom-width: calc(var(--border-width) * 2);
			border-style: solid;
			border-color: var(--color-primary-variant);
		}
		th {
			background-color: var(--color-light);
		}
		th div {
			width: 100%;
			display: flex;
			gap: ${rescaleRem(0.5)}rem;
			grid-template-columns: 1fr auto;
			align-items: center;
		}
		th div.center {
			justify-content: center;
		}
		th div.right {
			justify-content: end;
		}
		tr:nth-child(even) {
			background-color: var(--color-mute);
		}
		th,
		td {
			padding: ${rescaleRem(0.5)}rem;
		}
		td.center > div {
			display: flex;
			justify-content: center;
		}
		td.right > div {
			display: flex;
			justify-content: end;
		}
		th[aria-sort='ascending'],
		th[aria-sort='descending'] {
			font-weight: 700;
		}
		:host > div:last-child {
			padding: ${rescaleRem(0.5)}rem;
		}
		:host > div:last-child,
		:host > div:last-child > div:last-child {
			display: grid;
			align-items: center;
			justify-items: center;
			gap: ${rescaleRem(1)}rem;
		}

		@media (min-width: 1024px) {
			div.pagination kol-pagination {
				display: flex;
				align-items: center;
			}
		}
	`,
	'KOL-NAV': `
		* {
			margin: 0;
			padding: 0;
		}
		nav {
			font-family: var(--font-family);
			font-size: var(--font-size);
			background-color: var(--color-mute);
			width: 100%;
		}
		ul {
			list-style: none;
		}
		kol-link-wc,
		a {
			height: 100%;
			min-height: var(--a11y-min-size);
			display: flex;
			place-items: center;
		}
		.entry > kol-span-wc > span {
			width: 100%;
		}
		.entry > :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child {
			background-color: var(--color-light);
			text-decoration: none;
			color: var(--color-primary);
			width: 100%;
			display: flex;
			align-items: center;
			font-style: normal;
			line-height: ${rescaleRem(1.5)}rem;
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			transition-duration: 0.5s;
			transition-property: background-color, color, border-color;
			letter-spacing: 0.175px;
		}
		.entry > :is(kol-link-wc, kol-button-wc):first-child :is(a, button) {
			color: var(--color-primary);
			text-decoration: none;
		}
		.entry > :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child:hover {
			border-left-color: var(--color-primary-variant);
			background-color: var(--color-primary-variant);
		}
		.entry > :is(kol-link-wc, kol-button-wc, kol-span-wc):first-child:hover > :is(a, button, span) {
			color: var(--color-primary-variant);
			font-weight: 700;
			letter-spacing: unset;
		}
		.selected > :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child {
			background-color: var(--color-primary-variant);
			color: var(--color-primary);
			font-weight: 700;
		}
		.selected > :is(kol-link-wc, kol-button-wc, kol-span-wc):first-child > :is(a, button, span) {
			font-weight: 700;
		}
		.selected :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child:hover {
			color: var(--color-primary-variant);
			letter-spacing: unset;
		}
		.entry > kol-span-wc > span,
		.entry :is(a, button) {
			border-left-color: transparent;
			border-left-style: solid;
			border-left-width: ${rescaleRem(0.5)}rem;
			padding: ${rescaleRem(0.75)}rem ${rescaleRem(0.5)}rem ${rescaleRem(0.75)}rem ${rescaleRem(0.25)}rem;
		}
		.selected :is(a, button),
		[exportparts*='selected'] a {
			border-left-color: var(--color-primary);
		} /** Compact mode */
		.entry.compact :is(kol-button-wc, kol-link-wc, kol-span-wc):first-child {
			place-items: center;
		}
		.entry.compact > kol-span-wc > span {
			flex-direction: column;
		}
		.entry.compact > kol-span-wc > span,
		.entry.compact :is(a, button) {
			padding-left: 0;
		}
	`,
	'KOL-CARD': `
		/* https://www.figma.com/file/56JbmrssCRpjpfxoAFeHqT/Design-System-EPLF-(in-progress)?node-id=8225%3A5945 */
		:host > div {
			display: grid;
			width: 100%;
			height: 100%;
			background-color: var(--color-light);
			grid-template-rows: min-content 2fr min-content;
			box-shadow: 0 0 ${rescaleRem(0.25)}rem var(--color-subtle);
			border-radius: var(--border-radius);
		}
		:host kol-heading-wc {
			line-height: ${rescaleRem(1.75)}rem;
		}
		:host div.header {
			padding: ${rescaleRem(1)}rem ${rescaleRem(1)}rem ${rescaleRem(0.5)}rem ${rescaleRem(1)}rem;
		}
		:host div.content {
			padding: ${rescaleRem(0.5)}rem ${rescaleRem(1)}rem ${rescaleRem(1)}rem;
			overflow: hidden;
		}
		:host div.footer {
			padding: ${rescaleRem(0.5)}rem ${rescaleRem(1)}rem;
		}
	`,
	'KOL-INPUT-CHECKBOX': `
		:host kol-input {
			display: grid;
			align-items: center;
			justify-items: left;
			width: 100%;
			min-height: var(--a11y-min-size);
			gap: ${rescaleRem(0.4)}rem;
		}
		:host kol-input.default {
			grid-template-columns: ${rescaleRem(1.5)}rem auto;
		}
		:host kol-input.switch {
			grid-template-columns: ${rescaleRem(3.5)}rem auto;
		}
		:host kol-input.button {
			gap: ${rescaleRem(0.4)}rem 0;
		}
		:host kol-input > div.input {
			display: inherit;
			min-height: var(--a11y-min-size);
			order: 2;
		}
		:host kol-input > div.input input {
			margin: 0px;
		}
		:host kol-input > label {
			cursor: pointer;
			order: 3;
		}
		:host kol-input > kol-alert.error {
			order: 1;
			padding-top: calc(var(--spacing) / 2);
			grid-column: span 2 / auto;
		}
		:host kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: ${rescaleRem(1)}rem;
		}
		:host kol-input.error input:focus,
		kol-input.error select:focus,
		kol-input.error textarea:focus {
			outline-color: var(--color-danger) !important;
		}
		:host kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		:host input {
			cursor: pointer;
			order: 1;
			width: 100%;
			border-color: var(--color-subtle);
			border-width: 2px;
			border-style: solid;
			border-radius: var(--border-radius);
			line-height: 24px;
			font-size: ${rescaleRem(1)}rem;
		}
		:host input:hover {
			border-color: var(--color-primary);
			box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
		}
		:host input:focus:hover {
			box-shadow: none;
		}
		:host input:active {
			box-shadow: none;
		}
		:host kol-alert {
			display: block;
			width: 100%;
		} /* CHECKBOX */
		:host kol-input label span {
			margin-top: ${rescaleRem(0.125)}rem;
		}
		:host .required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		:host kol-input input[type='checkbox'] {
			appearance: none;
			background-color: white;
			cursor: pointer;
			transition: 0.5s;
		}
		:host kol-input input[type='checkbox'].kol-disabled:before {
			cursor: not-allowed;
		}
		:host kol-input input[type='checkbox']:before {
			content: '';
			cursor: pointer;
		}
		:host kol-input input[type='checkbox']:checked {
			background-color: var(--color-primary);
			border-color: var(--color-primary);
		}
		:host kol-input.default input[type='checkbox'] {
			border-radius: var(--border-radius);
			height: calc(6 * ${rescaleRem(0.25)}rem);
			min-width: calc(6 * ${rescaleRem(0.25)}rem);
			width: calc(6 * ${rescaleRem(0.25)}rem);
		}
		:host kol-input.default input[type='checkbox']:before {
			border-radius: 1.5em;
			background-color: transparent;
			display: block;
			height: calc(6 * ${rescaleRem(0.25)}rem);
			position: relative;
			width: calc(6 * ${rescaleRem(0.25)}rem);
		}
		:host kol-input.default input[type='checkbox']:checked:before {
			border-right-width: 3px;
			border-bottom-width: 3px;
			left: calc(1.5 * ${rescaleRem(0.25)}rem - 2px);
			top: calc(2.85 * ${rescaleRem(0.25)}rem - 2px);
			transform: rotate(40deg) translate(-50%, -50%);
			background-color: transparent;
			border-width: 0px 3px 3px 0px;
			border-color: white;
			border-radius: 1px;
			border-style: solid;
			height: calc(3 * ${rescaleRem(0.25)}rem);
			width: calc(1.5 * ${rescaleRem(0.25)}rem);
		}
		:host kol-input.default input[type='checkbox']:indeterminate {
			background-color: var(--color-primary);
		}
		:host kol-input.default input[type='checkbox']:indeterminate:before {
			background-color: var(--color-light);
			height: ${rescaleRem(0.125)}rem;
			top: ${rescaleRem(0.6)}rem;
			left: ${rescaleRem(0.25)}rem;
			width: calc(3 * ${rescaleRem(0.25)}rem);
			transform: inherit;
		}
		:host kol-input.default input[type='checkbox']:checked:indeterminate:before {
			border-width: 0px 1px 1px 0px;
		}
		:host kol-input.switch input[type='checkbox'] {
			min-width: 3.5em;
			width: 3.5em;
			background-color: var(--color-subtle);
			border-width: 0;
			height: 1.5em;
			border-radius: 1.25em;
			display: inline-block;
			position: relative;
		}
		:host kol-input.switch input[type='checkbox']:before {
			width: 1.25em;
			height: 1.25em;
			left: calc(0.25em - 2px);
			top: calc(0.25em - 2px);
			border-radius: 1.25em;
			background-color: white;
			position: absolute;
		}
		:host kol-input.switch input[type='checkbox']:checked {
			background-color: var(--color-primary);
		}
		:host kol-input.switch input[type='checkbox']:checked:before {
			transform: translateX(2em);
		}
		:host kol-input.switch input[type='checkbox']:indeterminate:before {
			transform: translateX(1em);
		}
		.switch {
			& .icon {
				width: 1.25em;
				height: 1.25em;
				left: 2px;
			}

			&:has(input:checked) .icon {
				transform: translate(2em, -50%);
			}

			&:has(input:indeterminate) .icon {
				transform: translate(1em, -50%);
			}
		}
		:host .disabled {
			opacity: 0.33;
		}
		.button:focus-within {
			border-radius: var(--border-radius);
			outline-color: var(--color-primary-variant);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: calc(var(--border-width) * 2);
		}
	`,
	'KOL-INPUT-RADIO': `
		label {
			cursor: pointer;
			display: grid;
			line-height: 20px;
			gap: calc(var(--spacing) * 2);
			width: 100%;
		}
		input {
			cursor: pointer;
			width: 100%;
			border-color: var(--color-subtle);
			border-width: 2px;
			border-style: solid;
			border-radius: 5px;
			line-height: 24px;
		}
		input:hover {
			border-color: var(--color-primary);
			box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
		}
		input:focus:hover {
			box-shadow: none;
		}
		input:hover {
			border-color: var(--color-primary);
		}
		kol-alert {
			display: block;
			width: 100%;
		}
		.required legend > span::after {
			content: '*';
			padding-left: 0.125em;
		} /* RADIO */
		fieldset {
			border: 0px;
			margin: 0px;
			padding: 0px;
			display: grid;
			gap: 0.25em;
		}
		fieldset div {
			align-items: center;
			cursor: pointer;
			display: flex;
			flex-direction: row;
			gap: ${rescaleRem(0.5)}rem;
			margin: 0;
			min-height: var(--a11y-min-size);
			position: relative;
		}
		fieldset div label {
			cursor: pointer;
			display: flex;
			padding-left: calc(var(--spacing) / 2);
			width: 100%;
		}
		fieldset div label span {
			margin-top: 0.125em;
		}
		fieldset div input[type='radio'] {
			appearance: none;
			transition: 0.5s;
			border-radius: 100%;
			height: calc(6 * ${rescaleRem(0.25)}rem);
			min-width: calc(6 * ${rescaleRem(0.25)}rem);
			width: calc(6 * ${rescaleRem(0.25)}rem);
		}
		fieldset div input[type='radio']:before {
			content: '';
			cursor: pointer;
			border-radius: 100%;
			display: block;
		}
		fieldset div input[type='radio']:checked:before {
			background-color: var(--color-primary);
		}
		fieldset div input[type='radio']:disabled {
			cursor: not-allowed;
			background-color: var(--color-mute-variant);
		}
		fieldset #error {
			order: 1;
		}
		fieldset legend {
			order: 2;
			display: contents;
		}
		fieldset kol-input {
			order: 3;
		}
		fieldset.error {
			padding-left: ${rescaleRem(1)}rem;
			border-left: 3px solid var(--color-danger);
		}
		fieldset kol-alert#error {
			color: var(--color-danger);
			font-weight: 700;
		}
		fieldset.error input:focus,
		fieldset.error select:focus,
		fieldset.error textarea:focus {
			outline-color: var(--color-danger) !important;
		}
		fieldset.error kol-alert.error {
			margin-left: -0.25em;
			color: var(--color-danger);
			font-weight: 700;
		}
		.disabled {
			opacity: 0.33;
		}
		fieldset.horizontal {
			display: flex;
			flex-wrap: wrap;
			gap: var(--spacing) calc(var(--spacing) * 2);
		}
		fieldset.horizontal legend {
			display: inline-block;
			margin-bottom: calc(var(--spacing) / 2);
		}
		fieldset .input-slot {
			gap: var(--spacing);
		}
		fieldset div label {
			padding-left: 0;
		}
	`,
	'KOL-TOAST-CONTAINER': `
		:host {
			top: ${rescaleRem(1)}rem;
			right: ${rescaleRem(1)}rem;
			width: 440px;
		}
	`,
	'KOL-TOAST': `
		.toast {
			margin-top: ${rescaleRem(1)}rem;
		}
	`,
	'KOL-TABS': `
		button:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
		:host kol-button-group-wc {
			display: inline-flex;
			gap: ${rescaleRem(2)}rem;
			flex-wrap: wrap;
		}
		button {
			box-sizing: border-box;
			background-color: transparent;
			border: 0;
			border-radius: var(--border-radius);
			font-style: normal;
			font-weight: 700;
			font-size: 18px;
			line-height: 22px;
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			color: var(--color-subtle);
			padding: 0;
		}
		button:hover {
			color: var(--color-primary);
		}
		button.primary,
		button.selected {
			color: var(--color-primary);
		}
		button kol-span-wc > span {
			border-bottom: 0.25em solid;
		}
		button kol-span-wc > span {
			gap: ${rescaleRem(0.5)}rem;
		}
		:host > div > div {
			padding: 0.25em 0;
		}
		div[role='tabpanel'] {
			height: 100%;
		}
		div.grid {
			height: 100%;
		}
		:host > .tabs-align-right {
			display: grid;
			grid-template-columns: 1fr auto;
		}
		:host > .tabs-align-right kol-button-group-wc {
			display: grid;
			order: 2;
		}
		:host > .tabs-align-left {
			display: grid;
			grid-template-columns: auto 1fr;
		}
		:host > .tabs-align-left kol-button-group-wc {
			display: grid;
			order: 0;
		}
		:host > .tabs-align-bottom {
			display: grid;
			grid-template-rows: 1fr auto;
		}
		:host > .tabs-align-bottom kol-button-group-wc {
			order: 2;
		}
		:host > .tabs-align-bottom kol-button-group-wc > div {
			display: flex;
		}
		:host > .tabs-align-bottom > kol-button-group-wc > div > div:first-child {
			margin: 0px ${rescaleRem(1)}rem 0px 0px;
		}
		:host > .tabs-align-bottom > kol-button-group-wc > div > div {
			margin: 0px ${rescaleRem(1)}rem;
		}
		:host > .tabs-align-top {
			display: grid;
			grid-template-rows: auto 1fr;
		}
		:host > .tabs-align-top kol-button-group-wc {
			order: 0;
		}
		:host > .tabs-align-top kol-button-group-wc > div {
			display: flex;
		}
		:host > .tabs-align-top > kol-button-group-wc > div > div:first-child {
			margin: 0px ${rescaleRem(1)}rem 0px 0px;
		}
		:host > .tabs-align-top > kol-button-group-wc > div > div {
			margin: 0px ${rescaleRem(1)}rem;
		}
		:host > div {
			display: grid;
		}
		:host > div.tabs-align-left {
			grid-template-columns: auto 1fr;
		}
		:host > div.tabs-align-right {
			grid-template-columns: 1fr auto;
		}
		:host > .tabs-align-left kol-button-group-wc,
		:host > .tabs-align-top kol-button-group-wc {
			order: 0;
		}
		:host > .tabs-align-bottom kol-button-group-wc,
		:host > .tabs-align-right kol-button-group-wc {
			order: 1;
		}
		:host > .tabs-align-left kol-button-group-wc,
		:host > .tabs-align-right kol-button-group-wc {
			gap: inherit;
		}
		:host > div.tabs-align-left kol-button-group-wc > div,
		:host > div.tabs-align-left kol-button-group-wc > div > div,
		:host > div.tabs-align-right kol-button-group-wc > div,
		:host > div.tabs-align-right kol-button-group-wc > div > div {
			display: grid;
		}
		:host > div.tabs-align-left kol-button-group-wc > div > div kol-button-wc,
		:host > div.tabs-align-right kol-button-group-wc > div > div kol-button-wc {
			width: 100%;
		}
		:host > div.tabs-align-bottom kol-button-group-wc div,
		:host > div.tabs-align-top kol-button-group-wc div {
			display: flex;
			flex-wrap: wrap;
		}
		:host kol-button-group-wc button {
			border: none;
		}
	`,
	'KOL-PAGINATION': `
		:host {
			display: grid;
			gap: ${rescaleRem(1)}rem;
		}
		:host .navigation-list {
			display: inline-flex;
			flex-wrap: wrap;
			align-items: center;
			gap: ${rescaleRem(0.5)}rem;
		}
		:host .selected button {
			min-width: var(--a11y-min-size);
			min-height: var(--a11y-min-size);
			display: grid;
			place-items: center;
			font-family: var(--font-family);
			cursor: not-allowed;
			font-weight: 700;
			border-radius: 50%;
			border: none;
			font-style: normal;
			text-align: center;
			width: inherit;
			transition-duration: 0.5s;
			transition-property: background-color, color, border-color;
			color: var(--color-primary);
			background-color: var(--color-mute-variant);
		}
		:host > div > span {
			align-self: flex-end;
			padding-bottom: ${rescaleRem(0.5)}rem;
			color: var(--color-primary);
		}
	`,
	'KOL-INPUT-RANGE': `
		.inputs-wrapper {
			gap: ${rescaleRem(1)}rem;
		}
		kol-input {
			gap: ${rescaleRem(0.25)}rem;
		}
		kol-input .error {
			order: 1;
		}
		kol-input label {
			order: 2;
		}
		kol-input .input {
			order: 3;
		}
		kol-input .hint {
			order: 4;
			font-size: ${rescaleRem(0.9)}rem;
			font-style: italic;
		}
		input::placeholder {
			color: var(--color-subtle);
		}
		.input {
			background-color: var(--color-light);
			border-color: var(--color-subtle);
			border-radius: var(--border-radius);
			border-style: solid;
			border-width: 2px;
			padding: 0 ${rescaleRem(0.5)}rem;
		}
		.input > kol-icon {
			width: ${rescaleRem(1)}rem;
		}
		.input.icon-left > kol-icon:first-child {
			margin-right: ${rescaleRem(0.5)}rem;
		}
		.input.icon-right > kol-icon:last-child {
			margin-left: ${rescaleRem(0.5)}rem;
		}
		.input:is(.icon-left, .icon-right) {
			padding-left: ${rescaleRem(1)}rem;
			padding-right: ${rescaleRem(1)}rem;
		}
		.input:hover {
			border-color: var(--color-primary);
		}
		input:read-only,
		input:disabled {
			cursor: not-allowed;
		}
		.required label > span::after {
			content: '*';
			padding-left: 0.125em;
		}
		kol-input.error {
			border-left: 3px solid var(--color-danger);
			padding-left: ${rescaleRem(1)}rem;
		}
		kol-input.error .input:focus-within {
			outline-color: var(--color-danger) !important;
		}
		kol-input.error kol-alert.error {
			color: var(--color-danger);
			font-weight: 700;
		}
		kol-input.disabled :is(input, label) {
			opacity: 1;
		}
		kol-input.disabled :is(.input) {
			background-color: var(--color-mute);
			border-color: var(--color-mute-variant);
			color: var(--color-text);
		}
	`,
	'KOL-LINK-BUTTON': `
		:is(a, button):focus {
			outline: none;
		}
		:is(a, button):focus kol-span-wc {
			outline-color: var(--color-primary-variant);
			outline-offset: 2px;
			outline-style: solid;
			outline-width: calc(var(--border-width) * 2);
			transition: outline-offset 0.2s linear;
		}
		:is(a, button) > kol-span-wc {
			font-weight: 700;
			border-radius: var(--a11y-min-size);
			border-style: solid;
			outline-width: calc(var(--border-width) * 2);
			min-height: var(--a11y-min-size);
			min-width: var(--a11y-min-size);
			padding: 8px 14px;
			text-align: center;
			transition-duration: 0.5s;
			transition-property: background-color, color, border-color;
		}
		:is(a, button):disabled > kol-span-wc {
			cursor: not-allowed;
			opacity: 0.5;
		}
		.primary :is(a, button) > kol-span-wc,
		.primary :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-primary);
			border-color: var(--color-primary);
			color: var(--color-light);
		}
		.secondary :is(a, button) > kol-span-wc,
		.secondary :is(a, button):disabled:hover > kol-span-wc,
		.normal :is(a, button) > kol-span-wc,
		.normal :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-light);
			border-color: var(--color-primary);
			color: var(--color-primary);
		}
		.danger :is(a, button) > kol-span-wc,
		.danger :is(a, button):disabled:hover > kol-span-wc {
			background-color: var(--color-danger);
			border-color: var(--color-danger);
			color: var(--color-light);
		}
		.ghost :is(a, button) > kol-span-wc,
		.ghost :is(a, button):disabled:hover > kol-span-wc {
			border-color: var(--color-light);
			background-color: var(--color-light);
			box-shadow: none;
			color: var(--color-primary);
		} /*-----------*/
		.primary :is(a, button):active > kol-span-wc,
		.primary :is(a, button):hover > kol-span-wc,
		.secondary :is(a, button):active > kol-span-wc,
		.secondary :is(a, button):hover > kol-span-wc,
		.normal :is(a, button):active > kol-span-wc,
		.normal :is(a, button):hover > kol-span-wc,
		.danger :is(a, button):active > kol-span-wc,
		.danger :is(a, button):hover > kol-span-wc,
		.ghost :is(a, button):active > kol-span-wc,
		.ghost :is(a, button):hover > kol-span-wc {
			background-color: var(--color-primary-variant);
			border-color: var(--color-primary-variant);
			box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-light);
		}
		.danger :is(a, button):active > kol-span-wc,
		.danger :is(a, button):hover > kol-span-wc {
			background-color: var(--color-danger);
			border-color: var(--color-danger);
		}
		:is(a, button):disabled:hover > kol-span-wc,
		:is(a, button):focus:hover > kol-span-wc {
			box-shadow: none;
		}
		.primary :is(a, button):active > kol-span-wc,
		.secondary :is(a, button):active > kol-span-wc,
		.normal :is(a, button):active > kol-span-wc,
		.danger :is(a, button):active > kol-span-wc,
		.ghost :is(a, button):active > kol-span-wc {
			border-color: var(--color-light);
			box-shadow: none;
			outline: none;
		}
		:is(a, button).hide-label > kol-span-wc {
			padding: ${rescaleRem(0.8)}rem;
			width: unset;
		}
		:is(a, button).hide-label > kol-span-wc > span > span {
			display: none;
		}
		:is(a, button).loading > kol-span-wc kol-icon {
			animation: spin 5s infinite linear;
		}
		/** small ghost button */
		.ghost :is(a, button).small > kol-span-wc {
			border: none;
			background-color: transparent;
			box-shadow: none;
		}
		.ghost :is(a, button).small > kol-span-wc > span {
			border-radius: 1.5em;
			border-style: solid;
			border-width: var(--border-width);
			border-color: var(--color-light);
			background-color: var(--color-light);
		}
		.ghost :is(a, button).small:active > kol-span-wc > span,
		.ghost :is(a, button).small:hover > kol-span-wc > span,
		.ghost :is(a, button).small.transparent:active > kol-span-wc > span,
		.ghost :is(a, button).small.transparent:hover > kol-span-wc > span {
			background-color: var(--color-primary-variant);
			border-color: var(--color-primary-variant);
			box-shadow: 0px 2px 8px 2px rgba(8, 35, 48, 0.24);
			color: var(--color-light);
		} /** :is(a,button) with transparent background */
		:is(a, button).transparent > kol-span-wc > span,
		.ghost :is(a, button).small.transparent > kol-span-wc > span,
		:is(a, button).transparent > kol-span-wc {
			background-color: transparent;
			border-color: transparent;
		}
	`,
	'KOL-BUTTON-LINK': `
		:is(a, button) {
			color: var(--color-primary);
			font-style: normal;
			font-weight: 400;
			text-decoration-line: underline;
			font-size: inherit;
		}
		:is(a, button):focus {
			outline: none;
		}
		:is(a, button):focus kol-span-wc {
			border-radius: var(--border-radius);
			outline: calc(var(--border-width) * 2) solid;
		}
		:is(a, button):hover {
			text-decoration-thickness: 0.25em;
		}
		:is(a, button):visited {
			color: var(--visited);
		}
		.hidden {
			display: none;
			visibility: hidden;
		}
		.skip {
			left: -99999px;
			overflow: hidden;
			position: absolute;
			z-index: 9999999;
		}
		.skip:focus {
			background: white;
			left: unset;
			position: unset;
		}
	`,
	'KOL-ABBR': `
		abbr {
			border-bottom: dashed var(--color-text) 1px;
			text-decoration: none !important;
		}
	`,
	'KOL-BREADCRUMB': `
		li:has(:is(kol-icon + kol-link, kol-icon + span)) kol-icon {
			font-size: ${rescaleRem(0.75)}rem;
			color: var(--color-subtle);
		}
		kol-link::part(icon) {
			font-size: ${rescaleRem(1.25)}rem;
		}
		ul li > :is(span, kol-link) {
			line-height: ${rescaleRem(1.25)}rem;
			height: 20px;
		}
		ul li:last-child > span {
			color: var(--color-subtle);
		}
	`,
	'KOL-MODAL': `
		:host .overlay .modal {
			max-height: calc(100% - 32px);
		}
	`,
	'KOL-ICON': `
		:host {
			width: 1em;
			height: 1em;
		}
		:host > i {
			width: 1em;
			height: 1em;
		}
	`,
	'KOL-SKIP-NAV': `
		kol-link-wc > a > kol-span-wc {
			border-radius: var(--a11y-min-size);
			border-style: solid;
			border-width: var(--border-width);
			gap: calc(var(--spacing) * 2);
			line-height: ${rescaleRem(1)}rem;
			padding: 8px 14px;
			background-color: var(--color-primary-variant);
			border-color: var(--color-primary-variant);
			color: var(--color-light);
			cursor: pointer;
		}
	`,
	'KOL-SPLIT-BUTTON': `.popover {
		background: #fff;
	}`,
});
