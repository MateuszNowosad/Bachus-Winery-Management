var mysql      = require('mysql');
var fs = require('fs');

var sql = fs.readFileSync('sql/initBachusDB.sql').toString();
console.log('5, sql filip: ', sql);
var connection = mysql.createConnection({
    host     : '172.17.0.2',
    user     : 'test',
    password : 'test',
    database : 'mysql',
    insecureAuth : true
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
    connection.query('SELECT * FROM employees', (err,rows) => {
        if(err) throw err;

        console.log('Data received from Db:\n');
        console.log(rows);
    });
});
