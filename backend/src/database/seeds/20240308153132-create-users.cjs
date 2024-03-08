'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const adminPassword = await bcrypt.hash('admin', 12);

    await queryInterface.bulkInsert('Users', [{
        name: 'Admin',
        surname: 'Admin',
        login: 'admin',
        password_hash: adminPassword,
        created_at: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
