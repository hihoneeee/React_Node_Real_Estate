import db from "../models";
import asyncHandler from "express-async-handler";
import { throwErrorWithStatus } from "../middlewares/errorHandle";
import { generateLengthCode } from "../utils/common";

export const createRole = asyncHandler(async (req, res) => {
  const { value } = req.body;
  const formattedCode = generateLengthCode(value);
  const response = await db.Role.findOrCreate({
    where: { value },
    defaults: {
      code: formattedCode,
      value: value,
    },
  });
  return res.status(200).json({
    success: response[1],
    msg: response[1] ? "Create role successfully!" : "Role already had exists!",
  });
});
