const { Sequelize } = require("sequelize");
require("dotenv").config();

// MySQL 연결 설정
const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
  }
);

module.exports = sequelize;
