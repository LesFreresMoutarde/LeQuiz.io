'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('question_type_question', {
      questionTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {model: 'question_type', key: 'id'},
        onDelete: 'RESTRICT',
      },
      questionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {model: 'question', key: 'id'},
        onDelete: 'RESTRICT',
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      }
    });
    await queryInterface.sequelize.query('ALTER TABLE "question_type_question" ADD CONSTRAINT "question_type_question_pkey" PRIMARY KEY ("questionTypeId", "questionId")');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('question_type_question');
  }
};
