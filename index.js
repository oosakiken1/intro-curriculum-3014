'use strict';
let http = require('http');
var server = http.createServer((req, res) => {
	let now = new Date();
	console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);
	res.writeHead(200, {
		'Content-Type': 'text/html',
		'charset': 'utf-8'
	});

	switch (req.method) {
		case 'GET':
			let fs = require('fs');
			let rs = fs.createReadStream('./form.html');
			rs.pipe(res);
			break;
		case 'POST':
			req.on('data', (data) => {
				let decoded = decodeURIComponent(data);
				let result = decoded.split('=')[1];
				console.info('[' + now + '] 投稿: ' + result);
				res.write('<!DOCTYPE html><html lang="jp"><body><h1>' +
					result + 'への投稿が完了しました</h1></body></html>');
				res.end();
			});
			break;
		default:
			break;
	}

}).on('error', (e) => {
	console.error('[' + new Date() + '] Server Error', e);
}).on('clientError', (e) => {
	console.error('[' + new Date() + '] Client Error', e);
});
var port = 8000;
server.listen(port, () => {
	console.info('[' + new Date() + '] Listening on ' + port);
});