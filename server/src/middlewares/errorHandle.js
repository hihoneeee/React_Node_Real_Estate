export const errHandle = (error, req, res, next) => {
  const formatMs = error?.message?.replaceAll(`\"`, "");
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  return res.status(statusCode).json({
    success: false,
    msg: formatMs,
  });
};

export const throwErrorWithStatus = (code, message, res, next) => {
  const formatMs = message?.replaceAll(`\"`, "");
  const error = new Error(formatMs);
  res.status(code), next(error);
};

export const NotFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found!`);
  res.status(404);
  next(error);
};

export const notificationAccAuth = (error, res, isExpired) => {
  const formatMs = error.message.replaceAll(`\"`, "");
  const statusCode = error.status || 401;
  return res.status(statusCode).json({
    success: false,
    msg: formatMs,
    err: isExpired ? 2 : 1,
  });
};
