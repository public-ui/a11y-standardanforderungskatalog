import { defineConfig } from '@unocss/webpack';
import { presetMini } from '@unocss/preset-mini';

export default defineConfig({
	presets: [presetMini()],
	postprocess: [
		(obj) => {
			obj.selector = '#bmi-standardanforderungskatalog-app ' + obj.selector;
		},
	],
});
