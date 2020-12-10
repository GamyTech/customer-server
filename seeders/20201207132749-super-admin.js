'use strict';
const crypto = require('crypto')
require('dotenv').config()

const salt = crypto.randomBytes(32).toString('hex')
const hash = crypto.pbkdf2Sync(process.env.SUPER_ADMIN_PASSWORD, salt, 100000, 64, 'sha512').toString('hex');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      first_name: 'Super',
      last_name: 'Admin',
      user_name: 'super-admin',
      email: 'jassayah@makor-capital.com',
      hashed_password: hash,
      salt: salt,
      birth_date: '1997-08-29',
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW')
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
