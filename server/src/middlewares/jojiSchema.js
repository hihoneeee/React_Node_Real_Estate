import joi from "joi";

export const string = joi.string().allow(null, "");
export const stringReq = joi.string().required();
export const number = joi.number().allow(null, "");
export const numberReq = joi.number().required();
export const array = joi.array().allow(null, "");
export const emailReq = joi
  .string()
  .pattern(new RegExp("@gmail.com"))
  .required();

export const textReq = joi
  .string()
  .regex(/^[a-zA-Z]+$/)
  .required()
  .messages({
    "string.pattern.base": "value must be a text from a to z",
  });
