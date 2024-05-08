import express from "express";
import * as controller from "../controllers/auth";
import { validateDTOBody } from "../middlewares/validate";
import joi from "joi";
import { numberReq, stringReq, emailReq } from "../middlewares/jojiSchema";
import { verifyAccessToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post(
  "/register",
  validateDTOBody(
    joi.object({
      password: stringReq,
      name: stringReq,
      phone: numberReq,
      roleCode: stringReq,
    })
  ),
  controller.register
);
router.post(
  "/login",
  validateDTOBody(
    joi.object({
      password: stringReq,
      phone: numberReq,
    })
  ),
  controller.login
);
router.post("/refresh-token", controller.refreshAccessToken);
router.post("/logout", controller.logout);

export default router;
