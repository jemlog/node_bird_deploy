require('dotenv').config()

module.exports = {
  development: {
    username: "root",
    password: "71312m**0312",
    database: "nodebird_schema",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: 'root',
    password: '71312m**0312',
    database: 'nodebird_schema',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging : false
  }
}
