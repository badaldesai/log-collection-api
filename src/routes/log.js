const express = require('express');
const reader = require('../modules/reader');

const STATUS_CODE_SUCCESS = 200;

module.exports = function (app) {
	const router = express.Router();

	app.use('/logs', router);

	router.get('/:file', async (req, res, next) => {
		try {
			const { file } = req.params;
			const { limit, search } = req.query;
			const data = await reader.reader(file, limit, search);
			return res.status(STATUS_CODE_SUCCESS).send(data);
		} catch (err) {
			return next(err);
		}
	});
};
