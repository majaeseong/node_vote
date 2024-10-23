// routes/userRoutes.js
const express = require("express");
import roomService from "../services/room.service";
const router = express.Router();

/**
 * @swagger
 *
 * /api/rooms:
 *  post:
 *    summary: "방 생성"
 *    description: "POST 방식으로 방을 생성"
 *    tags: [Rooms]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: "방 제목"
 */
router.post("/", async (req, res) => {
  const { title } = req.body;

  const room = await roomService.insertRoom(title);
  console.log(room);
  res.json(room);
});

/**
 * @swagger
 *
 * /api/rooms/join:
 *  post:
 *    summary: "방에 참가"
 *    description: "POST 방식으로 방에 참가"
 *    tags: [Rooms]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              room_no:
 *                type: string
 *                description: "방 번호"
 *              nickname:
 *                type: string
 *                description: "방에서 사용할 닉네임"
 */
router.post("/join", async (req, res) => {
  const { room_no, nickname } = req.body;

  const room = await roomService.joinRoom(room_no, nickname);

  res.json(room);
});

module.exports = router;
