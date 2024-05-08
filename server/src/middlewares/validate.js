import { throwErrorWithStatus } from "./errorHandle";

export const validateDTOBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const message = error.details[0].message?.replaceAll(`\"`, "");
    throwErrorWithStatus(400, message, res, next);
  }
  next();
};
export const validateDTOQuery = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);
  if (error) {
    const message = error.details[0].message?.replaceAll(`\"`, "");
    throwErrorWithStatus(400, message, res, next);
  }
  next();
};

export const validateDTOParams = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params);
  if (error) {
    const message = error.details[0].message?.replaceAll(`\"`, "");
    throwErrorWithStatus(400, message, res, next);
  }
  next();
};
