'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('subscription', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            reference: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {model: 'user', key: 'id'},
                onDelete: 'RESTRICT',
            },
            startDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            expirationDate: {
                type: Sequelize.DATEONLY,
                allowNull: false,
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
        await queryInterface.addIndex('subscription', ['userId']);
        await queryInterface.addIndex('subscription', ['expirationDate']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('subscription');
    }
};