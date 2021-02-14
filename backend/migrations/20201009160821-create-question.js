'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('question', {
            id: {
                allowNull: false,
                primaryKey: true,
                unique: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            difficulty: {
                type: Sequelize.STRING(30),
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            answer: {
                type: Sequelize.JSONB,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            media: {
                type: Sequelize.JSONB,
            },
            customQuizId: {
                type: Sequelize.UUID,
                references: {model: 'custom_quiz', key: 'id'},
                onDelete: 'RESTRICT',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
        await queryInterface.addIndex('question', ['difficulty']);
        await queryInterface.addIndex('question', ['status']);
        await queryInterface.addIndex('question', ['customQuizId']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('question');
    }
};
