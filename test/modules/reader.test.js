const fs = require('fs');
const readerModule = require('../../src/modules/reader');

const NOT_FOUND_CODE = 404;

describe('modules.reader', function () {
	afterEach(function () {
		jest.clearAllMocks();
	});

	describe('modules.reader.reader', function () {
		beforeEach(function () {
			const mockReadStream = {
				pipe: jest.fn().mockReturnThis(),
				on: jest.fn().mockImplementation(function (event, handler) {
					if (event === 'data') {
						return handler('data');
					}
					if (event === 'end') {
						return handler();
					}
					return handler();
				}),
			};
			jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
			jest.spyOn(fs, 'createReadStream').mockImplementation(() => mockReadStream);
		});
		test('should throw and error if fs throws error', function () {
			fs.existsSync.mockImplementation(() => { throw new Error('fs Error'); });
			return expect(readerModule.reader('file')).rejects.toThrow('fs Error');
		});
		test('should repsonse with NOT_FOUND_CODE status if file not found', function () {
			fs.existsSync.mockImplementation(() => false);
			return expect(readerModule.reader('file')).rejects.toMatchObject({
				isBoom: true,
				output: {
					statusCode: NOT_FOUND_CODE,
					payload: {
						error: 'Not Found',
						message: 'File not found',
						statusCode: NOT_FOUND_CODE,
					},
				},
			});
		});
		test('should return logs for last 20 lines', function () {
			return expect(readerModule.reader('file')).resolves.toMatch('data');
		});
	});
});
