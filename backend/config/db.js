const mysql = require('mysql')
const db = mysql.createConnection({
    database: 'joji.com',
    host: 'localhost',
    user: 'root',
    password: ''
})

db.connect(err => {
    console.log("Database Connected")
})

module.exports = db;