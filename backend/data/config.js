require('dotenv').config()

const {DB_USER, DB_PASSWORD, DB_DATABASE, DB_SERVER, DB_PORT} = process.env

module.exports = {
    dbconfig : {
        user : DB_USER,
        password : DB_PASSWORD,
        database : DB_DATABASE,
        server : DB_SERVER,
        port : parseInt(DB_PORT),
        stream : false,
        options : {
            encrypt : false,
            enableArithAbort : true
        },
        pool: {
            max : 10,
            min : 1,
            idleTimeoutMillis : 3000000
        }
    }
}