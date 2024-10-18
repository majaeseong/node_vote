import express from "express";
import path from "path";
import http from "http";
const __dirname = path.resolve();
const sequelize = require("./db/db");
import routes from "./routes";

const app = express();

// 테이블 동기화
sequelize
  .sync({ force: false }) // force: true로 설정하면 테이블을 덮어씁니다.
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

//Route
routes(app);

const server = http.createServer(app);

const handleListen = () => console.log("Listening on http://localhost:3033");

server.listen(3033, handleListen);
