const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    database: 'iceshelf', // Replace with your database name
});

db.connect((err) => {
if (err) {
    console.log('Error connecting to Db');
    return;
}
    console.log('Connection established');
});

module.exports = db;