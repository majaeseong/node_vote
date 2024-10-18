const { Sequelize } = require('sequelize');

// MySQL 연결 설정
const sequelize = new Sequelize('vote_db', 'root', 'root', {
    host: '127.0.0.1',
    port:3306,
    dialect: 'mysql',
});

module.exports = sequelize;