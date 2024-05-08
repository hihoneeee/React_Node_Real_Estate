import express from "express";
import * as controller from "../controllers/user";
import { validateDTOQuery, validateDTOBody } from "../middlewares/validate";
import joi from "joi";
import { emailReq, stringReq } from "../middlewares/jojiSchema";
import { verifyAccessToken } from "../middlewares/verifyToken";

const router = express.Router();

router.get(
  "/forgot-password",
  validateDTOQuery(joi.object({ email: emailReq })),
  controller.forgotPassword
);
router.put(
  "/reset-password",
  validateDTOBody(joi.object({ password: stringReq, token: stringReq })),
  controller.restPassword
);
router.use(verifyAccessToken);
router.get("/", controller.getOneUser);
export default router;
