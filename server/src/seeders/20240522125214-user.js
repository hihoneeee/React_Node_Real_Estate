"use strict";
const { Users } = require("../utils/constants.cjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", Users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", null, {});
  },
};
