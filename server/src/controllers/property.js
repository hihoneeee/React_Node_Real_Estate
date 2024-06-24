import db from "../models";
import asyncHandler from "express-async-handler";
import redis from "../config/redis.config";
import { Sequelize } from "sequelize";
import { generateKeyRedis } from "../utils/checkNetwork";

export const createProperty = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    price,
    owner,
    userId,
    avatar,
    images,
    propertyTypeId,
  } = req.body;
  await db.Property.create({
    defaults: {
      title,
      description,
      price,
      owner,
      userId,
      avatar,
      images,
      propertyTypeId,
    },
  });
  return res.status(200).json({
    success: true,
    msg: "Create role successfully!",
  });
});

// export const getProperty = asyncHandler(async (req, res, next) => {
//   const { limit, page, sort, fields, address, ...query } = req.query;
//   const options = {};

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

//   if (address) {
//     query["$Property.address$"] = Sequelize.where(
//       Sequelize.fn("LOWER", Sequelize.col("Property.address")),
//       "LIKE",
//       `%${address.toLowerCase()}%`
//     );
//   }

//   if (sort) {
//     const order = sort
//       .split(",")
//       .map((el) =>
//         el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
//       );
//     options.order = order;
//   }

//   // limit all thì sẽ lấy ra tất cả
//   if (!limit) {
//     const alreadyGetAll = await redis.get("get-properties");
//     if (alreadyGetAll)
//       return res.json({
//         success: true,
//         msg: "Got successfully!",
//         properties: JSON.parse(alreadyGetAll),
//       });
//     const response = await db.Property.findAll({
//       where: query,
//       ...options,
//     });
//     redis.set("get-properties", JSON.stringify(response));
//     return res.status(200).json({
//       success: response.length > 0,
//       msg: response ? "Got successfully!" : "Cant got!",
//       count: response.length,
//       properties: response,
//     });
//   }

//   // cho phân trang
//   const offset = !page || +page <= 1 ? 0 : +page - 1;
//   const flimit = +limit || +process.env.LIMIT;
//   options.offset = offset * flimit;
//   options.limit = +flimit;
//   const response = await db.Property.findAndCountAll({
//     where: query,
//     ...options,
//     include: [
//       {
//         model: db.User,
//         as: "userData",
//         attributes: ["name", "phone", "email", "avatar"],
//       },
//     ],
//   });
//   return res.status(200).json({
//     success: response ? true : false,
//     msg: response ? "Got successfully!" : "Cant got!",
//     properties: response
//       ? { ...response, limit: +limit, page: +page ? +page : 1 }
//       : null,
//   });
// });

export const getProperty = asyncHandler(async (req, res, next) => {
  const { limit, page, sort, fields, address, ...query } = req.query;
  const options = {};

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

  if (address) {
    query["$Property.address$"] = Sequelize.where(
      Sequelize.fn("LOWER", Sequelize.col("Property.address")),
      "LIKE",
      `%${address.toLowerCase()}%`
    );
  }

  if (sort) {
    const order = sort
      .split(",")
      .map((el) =>
        el.startsWith("-") ? [el.replace("-", ""), "DESC"] : [el, "ASC"]
      );
    options.order = order;
  }

  const filter = {
    where: query,
    ...options,
  };

  const keys = generateKeyRedis(filter, sort, fields, page, limit, address);

  if (!limit) {
    const response = await db.Property.findAll({ ...filter });
    redis.set(keys, JSON.stringify(response));
    redis.expireAt(keys, parseInt(+new Date() / 1000) + 60);
    return res.status(200).json({
      success: response.length > 0,
      msg: response ? "Got successfully!" : "Cant got!",
      count: response.length,
      properties: response,
    });
  } else {
    const offset = !page || +page <= 1 ? 0 : +page - 1;
    const flimit = +limit || +process.env.LIMIT;
    options.offset = offset * flimit;
    options.limit = +flimit;
    const response = await db.Property.findAndCountAll({
      where: query,
      ...options,
      include: [
        {
          model: db.User,
          as: "userData",
          attributes: ["name", "phone", "email", "avatar"],
        },
      ],
    });
    redis.set(keys, JSON.stringify(response));
    redis.expireAt(keys, parseInt(+new Date() / 1000) + 60);
    return res.status(200).json({
      success: response ? true : false,
      msg: response ? "Got successfully!" : "Cant got!",
      count: response.rows.length,
      properties: response
        ? { ...response, limit: +limit, page: +page ? +page : 1 }
        : null,
    });
  }
});
