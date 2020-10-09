'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('custom_quiz', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authorId: {
        type: Sequelize.INTEGER,
        references: {model: 'user', key: 'id'},
        onDelete: 'RESTRICT',
        field: 'author_id'
      },
      reviewsRequested: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'reviews_requested'
      },
      status: {
        type: Sequelize.STRING(30),
        allowNull: false
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
    await queryInterface.addIndex('custom_quiz', ['title']);
    await queryInterface.addIndex('custom_quiz', ['author_id']);
    await queryInterface.addIndex('custom_quiz', ['reviews_requested']);
    await queryInterface.addIndex('custom_quiz', ['status']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('custom_quiz');
  }
};