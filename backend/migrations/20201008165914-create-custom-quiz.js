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
            },
            reviewsRequested: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            status: {
                type: Sequelize.STRING(30),
                allowNull: false
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
        await queryInterface.addIndex('custom_quiz', ['title']);
        await queryInterface.addIndex('custom_quiz', ['authorId']);
        await queryInterface.addIndex('custom_quiz', ['reviewsRequested']);
        await queryInterface.addIndex('custom_quiz', ['status']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('custom_quiz');
    }
};