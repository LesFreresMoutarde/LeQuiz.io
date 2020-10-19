'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subscription extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            })
        }
    };
    Subscription.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        reference: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        expirationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Subscription',
        tableName: 'subscription',
        indexes: [{
            fields: ['userId', 'expirationDate']
        }]
    });
    return Subscription;
};