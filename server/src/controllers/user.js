import db from "../models";
import asyncHandler from "express-async-handler";
import { throwErrorWithStatus } from "../middlewares/errorHandle";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendMail } from "../utils/sendMail";

export const getOneUser = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const response = await db.User.findOne({
    where: { id },
    attributes: {
      exclude: [
        "password",
        "refresh_token",
        "roleCode",
        "passwordChangeAt",
        "passwordResetExpires",
        "passwordResetToken",
        "updatedAt",
        "createdAt",
      ],
    },
    include: [
      {
        model: db.Role,
        as: "roleData",
        attributes: ["code"],
      },
    ],
  });
  if (!response) return throwErrorWithStatus(401, "User not found!", res, next);
  return res.status(200).json({
    success: true,
    msg: "Got successfully!",
    data: response,
  });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.query;
  const response = await db.User.findOne({ where: { email } });
  if (!response)
    return throwErrorWithStatus(401, "Email not found!", res, next);

  const resetTokenPassword = crypto.randomBytes(32).toString("hex");
  response.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetTokenPassword)
    .digest("hex");
  response.passwordResetExpires = Date.now() + 15 * 60 * 1000;
  await response.save();

  const html = `Please, click on the link below to change your password. This link will expire after 15 minutes: <a href='${process.env.URL_SERVER}/api/v1/user/reset-password/${resetTokenPassword}'>Change here!</a>`;

  const data = {
    email,
    html,
  };
  const rs = await sendMail(data);
  return res.status(200).json({
    success: true,
    data: rs,
  });
});
const { Op } = require("sequelize");
const currentTime = Date.now();

export const restPassword = asyncHandler(async (req, res, next) => {
  const { password, token } = req.body;
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const response = await db.User.findOne({
    where: {
      passwordResetToken,
      passwordResetExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!response) return throwErrorWithStatus(401, "Invalid token!", res, next);
  const hashPassword = (password) =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  response.password = hashPassword(password);
  response.passwordResetToken = undefined;
  response.passwordResetExpires = undefined;
  response.passwordChangeAt = currentTime;
  await response.save();
  return res.status(200).json({
    success: response ? true : false,
    msg: response ? "Change password successfully!" : "Cannt change password!",
  });
});
