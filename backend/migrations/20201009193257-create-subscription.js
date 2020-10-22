'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('subscription', {
            id: {
                allowNull: false,
                primaryKey: true,
                unique: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            reference: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            userId: {
                type: Sequelize.UUID,
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