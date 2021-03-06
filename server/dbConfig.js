// create database connection credentials object
let config = {
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  connectString: 'localhost:1521/orclpdb'
}

module.exports = config;