import userRoute from "./user.route";
import roomRoute from "./room.route";

const routes = (app) => {
  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: 유저 추가 수정 삭제 조회
   */
  app.use("/api/users", userRoute); // 기본 URL 경로에 prefix 추가

  /**
   * @swagger
   * tags:
   *   name: Rooms
   *   description: 방 추가 수정 삭제 조회
   */
  app.use("/api/rooms", roomRoute); // 기본 URL 경로에 prefix 추가
};

export default routes;
