const mysql = require('mysql')
const db = process.env

const connect = mysql.createConnection({
  host: db.DB_HOST,
  user: db.DB_USER,
  password: db.DB_PASS,
  database: db.DB_NAME
})

connect.connect()

module.exports = connect
