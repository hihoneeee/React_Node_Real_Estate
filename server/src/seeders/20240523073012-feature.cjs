"use strict";
const { Features } = require("../ultis/constants.cjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Features", Features);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Features", null, {});
  },
};
