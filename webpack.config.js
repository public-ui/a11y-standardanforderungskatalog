module.exports = (...args) => {
	const config = require('@leanup/stack-react/webpack.config')(...args);
	const UnoCSS = require('@unocss/webpack').default;

	// config.module = config.module ?? {};
	// config.module.rules = config.module.rules ?? [];
	// config.module.rules.push({
	// 	test: /\.xlsx$/i,
	// 	use: 'raw-loader',
	// });

	// if (args[0].WEBPACK_BUILD) {
	// 	const path = require('path');
	// 	const WebpackPwaManifest = require('webpack-pwa-manifest');
	// 	const pwaManifestConfigPath = path.resolve(process.cwd(), 'pwa-manifest.config.js');
	// 	const { GenerateSW } = require('workbox-webpack-plugin');
	// 	const workboxConfigPath = path.resolve(process.cwd(), 'workbox-config.js');
	// 	config.plugins.push(new WebpackPwaManifest(require(pwaManifestConfigPath)));
	// 	config.plugins.push(new GenerateSW(require(workboxConfigPath)));
	// }

	config.plugins.push(UnoCSS());

	return config;
};
