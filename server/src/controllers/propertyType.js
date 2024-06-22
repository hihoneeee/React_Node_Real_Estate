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
  if (title)
    query.title = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("title")),
      "LIKE",
      `%${title.toLowerCase()}%`
    );

  // sắp xếp
  if (sort) {
    const order = sort
      .split(",")
      .map((el) =>
        el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
      );
    options.order = order;
  }

  // limit all thì sẽ lấy ra tất cả
  const filter = {
    where: query,
    ...options,
  };
  if (!limit || title || sort || fields || page) {
    const keys = generateKeyRedis(filter, sort, fields, page, limit);
    const alreadyGetAll = await redis.get(keys);
    if (alreadyGetAll)
      return res.json({
        success: true,
        msg: "Got successfully!",
        PropertyTypes: JSON.parse(alreadyGetAll),
      });
    const response = await db.PropertyType.findAll({ ...filter });
    redis.set(keys, JSON.stringify(response));
    redis.expireAt(keys, parseInt(+new Date() / 1000) + 20);
    return res.status(200).json({
      success: response.length > 0,
      msg: response ? "Got successfully!" : "Cant got!",
      count: response.length,
      PropertyTypes: response,
    });
  }
  // cho phân trang
  const offset = !page || +page <= 1 ? 0 : +page - 1;
  const flimit = +limit || +process.env.LIMIT;
  options.offset = offset * flimit;
  options.limit = +flimit;
  const response = await db.PropertyType.findAndCountAll({
    where: query,
    ...options,
  });
  return res.status(200).json({
    success: response ? true : false,
    msg: response ? "Got successfully!" : "Cant got!",
    count: response.length,
    PropertyTypes: response,
  });
});

// export const getPropertyType = asyncHandler(async (req, res, next) => {
//   const { limit, page, sort, fields, title, ...query } = req.query;
//   const options = {};

//   // Ensure page and limit are valid numbers without leading zeros
//   const validLimit =
//     limit && /^[1-9]\d*$/.test(limit) ? parseInt(limit, 10) : null;
//   const validPage = page && /^[1-9]\d*$/.test(page) ? parseInt(page, 10) : 1;

//   // fields trường muốn lấy vd id, name
//   if (fields) {
//     const attributes = fields.split(",");
//     const isExclude = attributes.some((el) => el.startsWith("-"));
//     if (isExclude) {
//       options.attributes = {
//         exclude: attributes.map((el) => el.replace("-", "")),
//       };
//     } else {
//       options.attributes = attributes;
//     }
//   }

//   // tìm kiếm
//   if (title)
//     query.title = Sequelize.where(
//       Sequelize.fn("LOWER", Sequelize.col("title")),
//       "LIKE",
//       `%${title.toLowerCase()}%`
//     );

//   // sắp xếp
//   if (sort) {
//     const order = sort
//       .split(",")
//       .map((el) =>
//         el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
//       );
//     options.order = order;
//   }

//   // limit all thì sẽ lấy ra tất cả hoặc có title thì cũng tạo key
//   const filter = {
//     where: query,
//     ...options,
//   };

//   const keys = generateKeyRedis(filter, sort, fields, validPage, validLimit);

//   // Check the cache for existing results
//   const alreadyGetAll = await redis.get(keys);
//   if (alreadyGetAll) {
//     return res.json({
//       success: true,
//       msg: "Got successfully!",
//       PropertyTypes: JSON.parse(alreadyGetAll),
//     });
//   }

//   // cho phân trang
//   if (validLimit) {
//     const offset =
//       validPage && validPage > 1 ? (validPage - 1) * validLimit : 0;
//     options.offset = offset;
//     options.limit = validLimit;
//   }

//   // Fetch the data from the database
//   const response =
//     validLimit === null || validLimit === "all"
//       ? await db.PropertyType.findAll({ ...filter })
//       : await db.PropertyType.findAndCountAll({ where: query, ...options });

//   // Cache the results
//   redis.set(keys, JSON.stringify(response));
//   redis.expireAt(keys, parseInt(+new Date() / 1000) + 20);

//   // Return the results
//   return res.status(200).json({
//     success: !!response,
//     msg: response ? "Got successfully!" : "Can't get!",
//     count:
//       validLimit === null || validLimit === "all"
//         ? response.length
//         : response.count,
//     PropertyTypes:
//       validLimit === null || validLimit === "all" ? response : response.rows,
//   });
// });

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
