'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_review', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reviewerId: {
        type: Sequelize.INTEGER,
        references: {model: 'user', key: 'id'},
        onDelete: 'RESTRICT',
        field: 'reviewer_id'
      },
      customQuizId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  {model: 'custom_quiz', key: 'id'},
        onDelete: 'RESTRICT',
        field: 'custom_quiz_id'
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT
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
    await queryInterface.addIndex('user_review', ['reviewer_id']);
    await queryInterface.addIndex('user_review', ['custom_quiz_id']);
    await queryInterface.addIndex('user_review', ['status']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_review');
  }
};