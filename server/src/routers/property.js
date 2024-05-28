import express from "express";
import * as controller from "../controllers/property";
import { validateDTOBody } from "../middlewares/validate";
import joi from "joi";
import { stringReq, numberReq, required } from "../middlewares/jojiSchema";
import { isAdminOrOwner } from "../middlewares/verifyRole";
import { verifyAccessToken } from "../middlewares/verifyToken";

const router = express.Router();
// public
// router.use(rateLimter);

//private                                                                                                                                                                                                                                                                                                                                                                                                                                                            
router.use(verifyAccessToken);
router.use(isAdminOrOwner);
router.post(
  "/",
  validateDTOBody(
    joi.object({
      title: stringReq,
      description: stringReq,
      price: numberReq,
      owner: required,
      userId: required,
      avatar: required,
      images: required,
      propertyTypeId: required,
    })
  ),
  controller.createProperty
);

export default router;
