import { userService } from "../services/user.service";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */
function userController() {
  /**
   * @swagger
   * paths:
   *  /api/users:
   *    get:
   *      summary: "전체 유저 조회"
   *      description: "Get방식으로 요청"
   *      tags: [Users]
   *      responses:
   *        "200":
   *          description: 전체 유저 정보
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                    ok:
   *                      type: boolean
   *                    users:
   *                      type: object
   *                      example:
   *                          [
   *                            { "id": 1, "name": "유저1" },
   *                            { "id": 2, "name": "유저2" },
   *                            { "id": 3, "name": "유저3" },
   *                          ]
   */
  const getAllUsers = async (req, rep) => {
    //   const { articleId, content } = req.body;
    //   const userId = req.user!.id;
    //   const userEmail = req.user!.email;

    try {
      try {
        const result = await userService.getAllUsers();
        rep.status(200).send(result);
      } catch (error) {
        // handleError(rep, ERROR_MESSAGE.badRequest, error);
      }
    } catch (error) {
      //   handleError(rep, ERROR_MESSAGE.badRequest, error);
    }
  };
  return {
    getAllUsers,
  };
}

export default userController();
