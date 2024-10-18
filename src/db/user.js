// db/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,   // 자동 증가 설정
        primaryKey: true       // 기본 키 설정
    },
    unique_data: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
    
}, {
    timestamps: true
});

module.exports = User;