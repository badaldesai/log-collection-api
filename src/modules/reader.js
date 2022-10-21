const fs = require('fs');
const Boom = require('@hapi/boom');

const PATH_BASE = '/var/log';

module.exports = {
	reader: async (file, keyword, lines = 20) => {
		const filePath = `${PATH_BASE}/${file}.log`;
		if (!fs.existsSync(filePath)) {
			throw Boom.notFound('File not found');
		}
		return new Promise((resolve, reject) => {
			const stream = fs.createReadStream(filePath, { highWaterMark: 100 * 1024 });
			let chunk = [];
			const search = [];
			stream.on('data', (data) => {
				const temp = data.toString().split('\n');
				if (keyword) {
					temp.forEach((line) => {
						if (line.includes(keyword)) {
							search.push(line);
						}
					});
					return;
				}
				if (temp.length < lines) {
					chunk = [...chunk, ...temp];
				} else {
					chunk = temp;
				}
			});
			stream.on('end', () => {
				let result;
				if (keyword) {
					result = search.slice(-lines).join('\n');
				} else {
					result = chunk.slice(-lines).join('\n');
				}
				return resolve(result);
			});
			stream.on('error', (err) => reject(err));
		});
	},
};
