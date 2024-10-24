const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const User = require("./user");

const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // 자동 증가 설정
      primaryKey: true, // 기본 키 설정
    },
    room_no: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    question: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("ready", "start", "end"),
      allowNull: false,
      defaultValue: "ready",
    },
    userId: {
      // FK로 사용할 필드 추가
      type: DataTypes.INTEGER,
      references: {
        model: User, // User 모델의 PK를 참조
        key: "id", // User 모델의 'id' 필드를 참조
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// 관계 설정: Room은 User에 속한다
Room.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Room, { foreignKey: "userId" });

module.exports = Room;
