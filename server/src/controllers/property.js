import db from "../models";
import asyncHandler from "express-async-handler";
import { throwErrorWithStatus } from "../middlewares/errorHandle";

export const createProperty = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    price,
    owner,
    userId,
    avatar,
    images,
    propertyTypeId,
  } = req.body;
  await db.Property.create({
    defaults: {
      title,
      description,
      price,
      owner,
      userId,
      avatar,
      images,
      propertyTypeId,
    },
  });
  return res.status(200).json({
    success: true,
    msg: "Create role successfully!" ,
  });
});
