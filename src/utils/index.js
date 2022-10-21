const bunyan = require('bunyan');
const { name } = require('../../package.json');

module.exports = {
	log: bunyan.createLogger({
		level: process.env.LOGGING_LEVEL,
		name,
	}),
};
