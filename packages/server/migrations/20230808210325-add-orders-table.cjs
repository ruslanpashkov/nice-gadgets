'use strict';

const TABLE_NAME = 'orders';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      totalQuantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      items: {
        allowNull: false,
        type: Sequelize.JSONB,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
