'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tag_question', {
      questionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {model: 'question', key: 'id'},
        onDelete: 'RESTRICT',
      },
      tagId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {model: 'tag', key: 'id'},
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
    await queryInterface.sequelize.query('ALTER TABLE "tag_question" ADD CONSTRAINT "tag_question_pkey" PRIMARY KEY ("questionId", "tagId")');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tag_question');
  }
};
