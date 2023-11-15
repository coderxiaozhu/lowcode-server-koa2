const mysql = require("mysql2/promise")
const { mysqlConfig } = require('../config/envs/dev')

// mysql2 连接测试
async function testMysqlConn() {
    const connection = await mysql.createConnection(mysqlConfig);
    const [rows] = await connection.execute("select now();")
    return rows
}

;(async () => {
    const rows = await testMysqlConn()
    console.log('rows: ', rows);
})()

module.exports = testMysqlConn
