const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const User = require("./user");
const Room = require("./room");

const RoomUser = sequelize.define(
  "RoomUser",
  {
    status: {
      type: DataTypes.ENUM("ready", "survive", "die", "winner"),
      allowNull: false,
      defaultValue: "ready",
    },
    nickname: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    roomId: {
      // FK로 사용할 필드 추가
      type: DataTypes.INTEGER,
      references: {
        model: Room, // Room 모델의 PK를 참조
        key: "id", // Room 모델의 'id' 필드를 참조
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

RoomUser.belongsTo(User, { foreignKey: "userId" });
User.hasMany(RoomUser, { foreignKey: "userId" });

RoomUser.belongsTo(Room, { foreignKey: "roomId" });
Room.hasMany(RoomUser, { foreignKey: "roomId" });

module.exports = RoomUser;
