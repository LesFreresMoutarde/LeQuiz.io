'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(191),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      plan: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      isTrustyWriter: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_trusty_writer'
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_active'
      },
      isBanned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'is_banned'
      },
      unbanDate: {
        type: Sequelize.DATE,
        field: 'unban_date'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
    await queryInterface.addIndex('user', ['username']);
    await queryInterface.addIndex('user', ['email']);
    await queryInterface.addIndex('user', ['plan']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};