"use strict";
const { Property } = require("../ultis/constants.cjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Properties", Property);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Properties", null, {});
  },
};
