const sql = require('mssql')
const config = require('./config')

const pool = new sql.ConnectionPool(config.dbconfig).connect().then((pool)=>{
    console.log('connected to mssql')
    return pool
}).catch((err)=> console.log(err))

module.exports = {
    sql, pool
}