"use strict";
const { Property_Feature } = require("../ultis/constants.cjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Property_Features", Property_Feature);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Property_Features", null, {});
  },
};
