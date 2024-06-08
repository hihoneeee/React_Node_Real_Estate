"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Property.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "userData",
      });
    }
  }
  Property.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      price: DataTypes.FLOAT,
      listingType: {
        type: DataTypes.ENUM,
        values: ["sale", "rental"],
      },
      propertyTypeId: DataTypes.UUID,
      images: {
        type: DataTypes.TEXT,
        get() {
          const rawValue = this.getDataValue("images");
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(arrayImages) {
          this.setDataValue("images", JSON.stringify(arrayImages));
        },
      },
      avatar: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "cancel", "available"],
      },
      userId: DataTypes.UUID,
      isAvailable: DataTypes.BOOLEAN,
      bedroom: DataTypes.INTEGER,
      size: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
      yearBuild: DataTypes.INTEGER,
      owner: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Property",
    }
  );
  return Property;
};
