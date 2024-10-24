const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const User = require("./user");
const Room = require("./room");

const UserSelection = sequelize.define(
  "UserSelection",
  {
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
    question: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    selection: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    correct: {
      type: DataTypes.ENUM("none", "f", "t"),
      allowNull: false,
      defaultValue: "none",
    },
  },
  {
    timestamps: true,
  }
);

UserSelection.belongsTo(User, { foreignKey: "userId" });
User.hasMany(UserSelection, { foreignKey: "userId" });

UserSelection.belongsTo(Room, { foreignKey: "roomId" });
Room.hasMany(UserSelection, { foreignKey: "roomId" });

module.exports = UserSelection;
