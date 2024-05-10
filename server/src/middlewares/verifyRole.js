import { throwErrorWithStatus } from "./errorHandle";

export const isAdmin = (req, res, next) => {
  const { roleCode } = req.user;
  // console.log(roleCode);
  if (!roleCode || roleCode !== "DA5") {
    return throwErrorWithStatus(401, "Required role Admin!", res, next);
  }
  next();
};

export const isAgent = (req, res, next) => {
  const { roleCode } = req.user;
  if (roleCode !== "GA5")
    return throwErrorWithStatus(401, "Required role Agent!", res, next);

  next();
};

export const isUser = (req, res, next) => {
  const { roleCode } = req.user;
  if (roleCode !== "SU4")
    return throwErrorWithStatus(401, "Required role user!", res, next);
  next();
};

export const isAdminOrCreator = (req, res, next) => {
  const { roleCode } = req.user;
  if (roleCode !== "DA5" && roleCode !== "GA5")
    return throwErrorWithStatus(401, "Required role role or Agent!", res, next);
  next();
};
