const path = require('path');
module.exports = {
	publicPath: '/bmi-afo-katalog/',
	name: 'Standardanforderungskatalog für die Barrierefreiheit',
	short_name: 'BMI StAB',
	description: 'Die Anwendung erstellt einen Anforderungskatalog zum Testen der Barrierefreiheit.',
	lang: 'de-DE',
	start_url: '/bmi-afo-katalog/',
	display: 'standalone',
	orientation: 'portrait',
	theme_color: '#fff',
	background_color: '#fff',
	filename: 'manifest.json',
	icons: [
		{
			src: path.resolve('public/assets/kolibri.png'),
			sizes: [96, 128, 192, 256, 384, 512],
		},
	],
	crossorigin: null,
	inject: true,
	fingerprints: true,
	ios: true,
	includeDirectory: true,
};
