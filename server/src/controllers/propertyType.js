import db from "../models";
const { Op, Sequelize, where } = require("sequelize");
import asyncHandler from "express-async-handler";
import { throwErrorWithStatus } from "../middlewares/errorHandle";
import redis from "../config/redis.config";
import { generateKeyRedis } from "../utils/checkNetwork";

export const createPropertyType = asyncHandler(async (req, res, next) => {
  const { title, description, image } = req.body;
  const response = await db.PropertyType.findOrCreate({
    where: { title },
    defaults: {
      title,
      description,
      image,
    },
  });
  return res.status(200).json({
    success: response[1],
    msg: response[1] ? "Create successfully!" : "Property Type already exists!",
  });
});

export const getPropertyType = asyncHandler(async (req, res, next) => {
  const { limit, page, sort, fields, title, ...query } = req.query;
  const options = {};

  // fields trường muốn lấy vd id, name
  if (fields) {
    const attributes = fields.split(",");
    const isExclude = attributes.some((el) => el.startsWith("-"));
    if (isExclude) {
      options.attributes = {
        exclude: attributes.map((el) => el.replace("-", "")),
      };
    } else {
      options.attributes = attributes;
    }
  }

  // tìm kiếm
  if (title) {
    query.title = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("title")),
      "LIKE",
      `%${title.toLowerCase()}%`
    );
  }

  // sắp xếp
  if (sort) {
    const order = sort
      .split(",")
      .map((el) =>
        el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
      );
    options.order = order;
  }

  // dùng limit để thì sẽ lấy ra
  const filter = {
    where: query,
    ...options,
  };

  const keys = generateKeyRedis(filter, sort, fields, page, limit);

  if (!limit) {
    const response = await db.PropertyType.findAll({ ...filter });
    redis.set(keys, JSON.stringify(response));
    redis.expireAt(keys, parseInt(+new Date() / 1000) + 86400);
    return res.status(200).json({
      success: response.length > 0,
      msg: response ? "Got successfully!" : "Cant got!",
      count: response.length,
      data: response,
    });
  } else {
    const offset =
      !page || +page <= 1 ? 0 : (+page - 1) * (+limit || +process.env.LIMIT);
    options.offset = offset;
    options.limit = +limit || +process.env.LIMIT;
    const response = await db.PropertyType.findAndCountAll({
      where: query,
      ...options,
    });
    redis.set(keys, JSON.stringify(response));
    redis.expireAt(keys, parseInt(+new Date() / 1000) + 86400);
    return res.status(200).json({
      success: response ? true : false,
      msg: response ? "Got successfully!" : "Cant got!",
      count: response.rows.length,
      data: response
        ? { ...response, limit: +limit, page: +page ? +page : 1 }
        : null,
    });
  }
});

export const updatePropertyType = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  if (Object.keys(req.body).length === 0)
    return throwErrorWithStatus(403, "Need import 1 value!", res, next);

  const checkTitle = await db.PropertyType.findOne({ where: { title: title } });
  if (checkTitle)
    return throwErrorWithStatus(
      400,
      "Property Type already exists!",
      res,
      next
    );

  const response = await db.PropertyType.update(
    { title, description, image },
    { where: { id: id } }
  );
  return res.status(200).json({
    success: response[0] > 0,
    msg: response[0] > 0 ? "Update successfully!" : "Property Type not found!",
  });
});

export const deletePropertyType = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const response = await db.PropertyType.destroy({ where: { id: id } });
  return res.status(200).json({
    success: response > 0,
    msg: response > 0 ? "Deleted successfully!" : "Property Type not found!",
  });
});

export const getPropertyTypeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const response = await db.PropertyType.findOne({
    where: { id: id },
    attributes: {
      exclude: ["id", "updatedAt", "createdAt"],
    },
  });
  return res.status(200).json({
    success: response ? true : false,
    msg: response ? "Got successfully!" : "Property Type not found!",
    data: response,
  });
});
