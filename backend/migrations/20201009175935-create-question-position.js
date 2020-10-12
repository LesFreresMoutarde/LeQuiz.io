'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('question_position', {
            questionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                primaryKey: true,
                references: {model: 'question', key: 'id'},
                onDelete: 'RESTRICT',
            },
            position: {
                type: Sequelize.INTEGER,
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
        await queryInterface.addIndex('question_position', ['position']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('question_position');
    }
};
