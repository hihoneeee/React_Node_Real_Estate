import express from "express";
import * as controller from "../controllers/propertyType";
import { validateDTOBody } from "../middlewares/validate";
import joi from "joi";
import { stringReq, string } from "../middlewares/jojiSchema";
import { isAdmin } from "../middlewares/verifyRole";
import { verifyAccessToken } from "../middlewares/verifyToken";
import { rateLimter } from "../middlewares/rateLimiter";

const router = express.Router();
// public
router.use(rateLimter);
router.get("/", controller.getPropertyType);

//private
// router.use(verifyAccessToken);
// router.use(isAdmin);
router.post(
  "/",
  validateDTOBody(
    joi.object({
      title: stringReq,
      description: stringReq,
      image: stringReq,
    })
  ),
  controller.createPropertyType
);
router.put(
  "/:id",
  validateDTOBody(
    joi.object({
      title: string,
      description: string,
      image: string,
    })
  ),
  controller.updatePropertyType
);

router.delete("/:id", controller.deletePropertyType);

export default router;
