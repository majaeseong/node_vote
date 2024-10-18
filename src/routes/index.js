import userRoute from "./user.route";

const routes = (app) => {
  app.use("/api/users", userRoute); // 기본 URL 경로에 prefix 추가
};

export default routes;
