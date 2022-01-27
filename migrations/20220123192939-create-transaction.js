'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      transaction_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'transactiontypes'
          },
          key: 'id'
        }
      },
      coin_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quanity: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      datetime: {
        type: Sequelize.DATE
      },
      price_per_coin: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      total_spent: {
        type: Sequelize.DECIMAL,
        allowNull: false
      }
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Transactions");
  }
};

