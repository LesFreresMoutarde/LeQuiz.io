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
            },
            customQuizId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references:  {model: 'custom_quiz', key: 'id'},
                onDelete: 'RESTRICT',
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
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
        await queryInterface.addIndex('user_review', ['reviewerId']);
        await queryInterface.addIndex('user_review', ['customQuizId']);
        await queryInterface.addIndex('user_review', ['status']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('user_review');
    }
};