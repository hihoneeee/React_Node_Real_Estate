import db from "../models";
import asyncHandler from "express-async-handler";
import { throwErrorWithStatus } from "../middlewares/errorHandle";

export const createProperty = asyncHandler(async (req, res, next) => {
  const {} = req.body;
});
