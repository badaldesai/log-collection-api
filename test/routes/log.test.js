const express = require('express');
const supertest = require('supertest');

const logRoute = require('../../src/routes/log');
const readerModule = require('../../src/modules/reader');
const middleware = require('../../src/middleware');

describe('Log Route', function () {
	beforeEach(() => {
		jest.spyOn(readerModule, 'reader').mockImplementation();
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	describe('GET /logs/system', function () {
		test('should return 200 if route is setup properly', async function () {
			const app = express();
			app.use(express.json());
			logRoute(app);
			middleware.registerErrorHandlers(app);
			const request = supertest(app);
			return request.get('/logs/system')
				.expect(200);
		});
		test('should return 500 if the modules throws an error', async function () {
			const app = express();
			app.use(express.json());
			logRoute(app);
			const request = supertest(app);
			middleware.registerErrorHandlers(app);
			readerModule.reader.mockImplementation(() => { throw new Error('Error'); });
			return request.get('/logs/system')
				.expect(500);
		});
	});
});
