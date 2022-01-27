'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Transactiontypes", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      transaction_type_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Transactiontypes");
  }
};
