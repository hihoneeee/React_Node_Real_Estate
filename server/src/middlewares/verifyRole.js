import { notificationAccAuth } from "./errorHandle";

export const isAdmin = (req, res, next) => {
  const { roleCode } = req.user;
  if (roleCode !== "DA5")
    return notificationAccAuth("Required role Admin!", res);
  next();
};

export const isWriter = (req, res, next) => {
  const { roleCode } = req.user;
  if (roleCode !== "writer")
    return notificationAccAuth("Required role Writer!", res);
  next();
};

export const isAdminOrCreator = (req, res, next) => {
  const { roleCode } = req.user;
  if (roleCode !== "admin" && roleCode !== "creator")
    return notificationAccAuth("Required role Admin or Creator!", res);
  next();
};
