var mysql      = require('mysql');
var fs = require('fs');

var sql = fs.readFileSync('sql/initBachusDB.sql').toString();
console.log('5, sql filip: ', sql);
var connection = mysql.createConnection({
    host     : '172.17.0.3',
    user     : 'admin',
    password : 'password',
    database : 'bachus_winery',
    insecureAuth : true
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

});