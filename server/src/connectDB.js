var mysql = require('mysql');
var fs = require('fs');

var sql = fs.readFileSync('sql/initBachusDB.sql').toString();
var connection = mysql.createConnection({
	host: '172.17.0.3',
	user: 'test',
	password: 'test',
	database: 'bachus-winery',
	insecureAuth: true
});

connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('==========================================================================================');
	console.log('Connected as id ' + connection.threadId);
	console.log('==========================================================================================');
	// connection.query('use bachusWinery', (err,rows) => {
	//     console.log('22,  filip: ');
	//     if(err) throw err;
	//     console.log('Using bachus-winery Database:\n');
	// });
	connection.query('show tables', (err, rows) => {
		if (err) throw err;
		console.log(rows);
	});
	// connection.query(sql, (err,rows) => {
	//     if(err) throw err;
	//
	//     console.log('Data received from Db:\n');
	//     console.log(rows);
	// });
	// connection.query('show tables', (err,rows) => {
	//     if(err) throw err;
	//     console.log(rows);
	// });
	connection.end();
});
