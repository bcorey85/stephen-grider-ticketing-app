module.exports = {
	webpackDevMiddelware: config => {
		config.watchOptions.poll = 300;
		return config;
	}
};
