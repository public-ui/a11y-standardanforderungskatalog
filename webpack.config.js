import Config from '@leanup/stack-react/webpack.config.js';
import UnoCSS from '@unocss/webpack';

export default (...args) => {
	const config = Config(...args);
	config.plugins.push(UnoCSS());
	return config;
};
