'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('category_custom_quiz', {
      /*id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },*/
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'category', key: 'id'},
        onDelete: 'RESTRICT',
        field: 'category_id'
      },
      customQuizId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'custom_quiz', key: 'id'},
        onDelete: 'RESTRICT',
        field: 'custom_quiz_id'
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
    await queryInterface.sequelize.query('ALTER TABLE "category_custom_quiz" ADD CONSTRAINT "category_custom_quiz_pkey" PRIMARY KEY ("category_id", "custom_quiz_id")');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('category_custom_quiz');
  }
};