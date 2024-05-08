"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "roleCode",
        targetKey: "code",
        as: "roleData",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleCode: DataTypes.STRING,
      avatar: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      passwordChangeAt: DataTypes.STRING,
      passwordResetToken: DataTypes.STRING,
      passwordResetExpires: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
