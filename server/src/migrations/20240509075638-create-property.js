"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Properties", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      listingType: {
        type: Sequelize.ENUM(["sale", "rental"]),
        allowNull: false,
      },
      propertyTypeId: {
        type: Sequelize.UUID,
        references: {
          model: "PropertyTypes",
          key: "id",
        },
        allowNull: false,
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(["pending", "cancel", "available"]),
        defaultValue: "pending",
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      isAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      bedroom: {
        type: Sequelize.INTEGER,
      },
      bathroom: {
        type: Sequelize.INTEGER,
      },
      yearBuild: {
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Properties");
  },
};
