import db from "../models";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { throwErrorWithStatus } from "../middlewares/errorHandle";
import jwt from "jsonwebtoken";
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const register = asyncHandler(async (req, res) => {
  const { name, phone, password, roleCode } = req.body;
  const response = await db.User.findOrCreate({
    where: { phone },
    defaults: {
      name,
      phone,
      password: hashPassword(password),
      roleCode,
    },
  });
  return res.status(200).json({
    success: response[1],
    msg: response[1]
      ? "Create account successfully!"
      : "Phone already had exists!",
  });
});

export const checkPhoneNumber = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  const response = await db.User.findOne({ where: { phone }, raw: true });
  return res.status(200).json({
    success: response ? false : true,
    msg: response ? "Phone already had exists!" : "DB Dont have phone number!",
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { phone, password } = req.body;
  const response = await db.User.findOne({
    where: { phone },
    raw: true,
  });
  if (!response)
    return throwErrorWithStatus(401, "Phone number is wrong!", res, next);
  const checkPassword = bcrypt.compareSync(password, response.password);
  if (!checkPassword)
    return throwErrorWithStatus(401, "Password is wrong!", res, next);
  const accessToken = jwt.sign(
    { id: response.id, roleCode: response.roleCode },
    process.env.JWT_SECRET,
    { expiresIn: "60s" }
  );
  const refreshToken = jwt.sign(
    {
      id: response.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  await db.User.update(
    { refresh_token: refreshToken },
    { where: { id: response.id } }
  );
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    msg: "Login successfully!",
    access_token: accessToken,
    refresh_token: refreshToken,
  });
});

export const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.body.refresh_token;
  if (!refreshToken) {
    return throwErrorWithStatus(401, "No refresh token in body!", res, next);
  }
  const decodedToken = await jwt.verify(refreshToken, process.env.JWT_SECRET);
  const response = await db.User.findOne({
    where: { id: decodedToken.id, refresh_token: refreshToken },
  });

  if (!response) {
    return throwErrorWithStatus(401, "User not found!", res, next);
  }

  const accessToken = jwt.sign(
    {
      id: response.id,
      roleCode: response.roleCode,
    },
    process.env.JWT_SECRET,
    { expiresIn: "300s" }
  );

  return res.status(200).json({
    success: true,
    access_token: accessToken,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refresh_token) {
    return throwErrorWithStatus(401, "No refresh token in cookies!", res, next);
  }
  await db.User.update(
    { refresh_token: "" },
    { where: { refresh_token: cookie.refresh_token } }
  );
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    msg: "Logout successfully!",
  });
});
