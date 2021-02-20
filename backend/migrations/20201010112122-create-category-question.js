'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('category_question', {
            categoryId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {model: 'category', key: 'id'},
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
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
                type: Sequelize.DATE,
            }
        });
        await queryInterface.sequelize.query('ALTER TABLE "category_question" ADD CONSTRAINT "category_question_pkey" PRIMARY KEY ("categoryId", "questionId")')
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('category_question');
    }
};
