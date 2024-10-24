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

/**
 * @swagger
 *
 * /api/rooms/{id}/select:
 *  patch:
 *    summary: "관리자가 낸 문제에 대한 답변하기"
 *    description: "PATCH 방식으로 답변"
 *    tags: [Rooms]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 방 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              selection:
 *                type: number
 *                description: "답변"
 *              question:
 *                type: number
 *                description: "문항"
 */
router.patch("/:id/select", async (req, res) => {
  const { id } = req.params;
  const { selection, question } = req.body;

  const room = await roomService.q_select(id, question, selection);

  res.json(room);
});

/**
 * @swagger
 *
 * /api/rooms/{id}/status:
 *  patch:
 *    summary: "관리자가 방 상태 변경"
 *    description: "PATCH 방식으로 방 상태 변경"
 *    tags: [Rooms]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 방 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
 *                description: "상태"
 */
router.patch("/:id/status", async (req, res) => {
  console.log("here?");
  const { id } = req.params;
  const { status } = req.body;

  const room = await roomService.roomStatus(id, status);

  res.json(room);
});

/**
 * @swagger
 *
 * /api/rooms/{id}/next:
 *  patch:
 *    summary: "관리자가 답변 선택"
 *    description: "PATCH 방식으로 답변 선택"
 *    tags: [Rooms]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 방 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              selection:
 *                type: number
 *                description: "답변"
 *              status:
 *                type: string
 *                description: "상태"
 */
router.patch("/:id/next", async (req, res) => {
  const { id } = req.params;
  const { selection, status } = req.body;

  const room = await roomService.questionNext(id, selection, status);

  res.json(room);
});

module.exports = router;
