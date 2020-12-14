'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'balance', {
      type: Sequelize.FLOAT,
      defaultValue: 0,
      allowNull: false
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'balance')
  }
};
