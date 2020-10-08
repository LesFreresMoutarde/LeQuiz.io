'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('subscription', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {model: 'user', key: 'id'},
        onDelete: 'RESTRICT'
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        field: 'start_date'
      },
      expirationDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        field: 'expiration_date'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      }
    });
    await queryInterface.addIndex('subscription', ['user_id']);
    await queryInterface.addIndex('subscription', ['expiration_date']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('subscription');
  }
};