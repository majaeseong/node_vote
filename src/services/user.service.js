const User = require("../db/user");

function userService() {
  const getAllUsers = async () => {
    try {
      const users = await User.findAll(); // 모든 유저 정보 조회
      return users;
    } catch (error) {
      throw error;
    }
  };

  const insertUser = async (unique_data) => {
    try {
      const newUser = {
        unique_data,
      };
      const existUser = await User.count({
        where: {
          unique_data,
        },
      });

      if (existUser > 0) {
        throw new Error("user Exist");
      } else {
        const user = await User.create(newUser);
        return user;
      }
    } catch (error) {
      throw error;
    }
  };

  const getUser = async (id) => {
    try {
      const user = await User.findByPk(id); // 모든 유저 정보 조회
      return user;
    } catch (error) {
      throw error;
    }
  };

  return {
    getAllUsers,
    insertUser,
    getUser,
  };
}

export default userService();
