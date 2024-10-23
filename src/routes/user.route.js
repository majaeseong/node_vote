const express = require("express");
const router = express.Router();
import userService from "../services/user.service";

/**
 * @swagger
 * paths:
 *  /api/users:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
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
router.get("/", async (req, res) => {
  const users = await userService.getAllUsers();
  console.log(users);
  res.json(users);
});

/**
 * @swagger
 *
 * /api/users:
 *  post:
 *    summary: "유저 생성"
 *    description: "POST 방식으로 유저를 생성"
 *    tags: [Users]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              unique_data:
 *                type: string
 *                description: "유저 기기 유니크 값"
 */
router.post("/", async (req, res) => {
  const { unique_data } = req.body;

  const user = await userService.insertUser(unique_data);
  console.log(user);
  res.json(user);
});

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: "특정 유저조회 Path 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{ "id": 1, "name": "유저1" }]
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const users = await userService.getUser(id);
  console.log(users);
  res.json(users);
});

// router.get("/:id", async (req, res) => {
//   const user = await getUserById(req.params.id);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });

module.exports = router;
