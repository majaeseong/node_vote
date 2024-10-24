import express from "express";
import path from "path";
import http from "http";

//불러와야 동기화가 됨
import User from "./db/user";
import Room from "./db/room";
import RoomUser from "./db/room-user";
import UserSelection from "./db/user-selection";

const sequelize = require("./db/db");
import routes from "./routes";
const { swaggerUi, specs } = require("./config/swagger.config");

const app = express();

// x-www-form-urlencoded 데이터 파싱 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // 만약 JSON 형식도 받을 경우

// 테이블 동기화
sequelize
  .sync({ alter: true }) // force: true로 설정하면 테이블을 덮어씁니다.
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

//Route
routes(app);

//Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const server = http.createServer(app);

//Socket
// const wss = SocketIO(server);

const handleListen = () => console.log("Listening on http://localhost:3033");

server.listen(3033, handleListen);
