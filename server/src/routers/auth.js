import express from "express";
import * as controller from "../controllers/auth";
import { validateDTOBody } from "../middlewares/validate";
import joi from "joi";
import { numberReq, stringReq } from "../middlewares/jojiSchema";

const router = express.Router();
router.post(
  "/check-phone",
  validateDTOBody(
    joi.object({
      phone: numberReq,
    })
  ),
  controller.checkPhoneNumber
);
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
