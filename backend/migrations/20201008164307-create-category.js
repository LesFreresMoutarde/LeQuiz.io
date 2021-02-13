'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('category', {
            id: {
                allowNull: false,
                primaryKey: true,
                unique: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true
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
        await queryInterface.addIndex('category', ['name']);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('category');
    }
};
