const User = require("../db/user");
// import { getCrrentDate } from "../lib/date.helper";
// import db from "../lib/db";
// import { ARTICLE_TYPE, ERROR_MESSAGE } from "../lib/constants";

function userService() {
  const getAllUsers = async () => {
    try {
      //   const result = await db.article.delete({
      //     where: {
      //       id: articleId,
      //     },
      //   });
      const users = await User.findAll(); // 모든 유저 정보 조회
      return users;

      //   const returnValue = {
      //     totalPage: total,
      //     articleList: returnArticles,
      //   };

      //   return returnValue;
    } catch (error) {
      throw error;
    }
  };

  return {
    getAllUsers,
  };
}

export default userService();
