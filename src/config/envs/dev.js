module.exports = {
  // mysql配置
  mysqlConfig: {
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "lowcode_db",
  },
  // mongodb配置
  mongodbConf: {
    host: "localhost",
    port: "27017",
    dbName: "lowcode_works",
  },
  // redis配置
  redisConf: {
    port: '6379',
    host: '127.0.0.1',
    password: '123456'
  }
};
