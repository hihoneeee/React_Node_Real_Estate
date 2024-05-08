import express from "express";
import * as controller from "../controllers/role";
import { validateDTOBody } from "../middlewares/validate";
import joi from "joi";
import { textReq } from "../middlewares/jojiSchema";
import { isAdmin } from "../middlewares/verifyRole";
import { verifyAccessToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post(
  "/",
  validateDTOBody(
    joi.object({
      value: textReq,
    })
  ),
  controller.createRole
);

export default router;
