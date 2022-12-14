const sql = require('mysql2')
const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
} = require('../configs/constant')

const connection = sql.createConnection({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_NAME,
    port:DB_PORT
})

module.exports = connection.promise();