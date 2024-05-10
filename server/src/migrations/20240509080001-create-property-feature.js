"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Property_Features", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      propertyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Properties",
          key: "id",
        },
      },
      featureId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Features",
          key: "id",
        },
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
    await queryInterface.dropTable("Property_Features");
  },
};
