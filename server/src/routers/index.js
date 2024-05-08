import { NotFound, errHandle } from "../middlewares/errorHandle";
import auth from "./auth";
import user from "./user";
import role from "./role";

const initRouters = (app) => {
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/user", user);
  app.use("/api/v1/role", role);

  app.use(NotFound);
  app.use(errHandle);
};

export default initRouters;
