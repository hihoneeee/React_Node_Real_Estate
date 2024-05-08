import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

export const verifyAccessToken = expressAsyncHandler(async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err)
        return res.status(401).json({
          success: false,
          msg: "Invalid access token!",
        });
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      msg: "Require authentication!",
    });
  }
});
