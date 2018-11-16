'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bill_borrowers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      billId: { // fk
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId: { // fk
        allowNull: false,
        type: Sequelize.INTEGER
      },
      toPay: {
        type: Sequelize.DECIMAL(19, 4)
      },
      paidAmount: {
        allowNull: false,
        type: Sequelize.DECIMAL(19, 4),
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: null
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bill_borrowers');
  }
};