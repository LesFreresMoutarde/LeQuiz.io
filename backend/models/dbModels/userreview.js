'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserReview extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'reviewerId',
                as: 'reviewer'
            });

            this.belongsTo(models.CustomQuiz, {
                foreignKey: 'customQuizId',
                as: 'customQuiz'
            });
        }
    };
    UserReview.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        reviewerId: {
            type: DataTypes.UUID,
        },
        customQuizId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT
        },
    }, {
        sequelize,
        modelName: 'UserReview',
        tableName: 'user_review',
        indexes: [{
            fields: ['reviewerId', 'customQuizId', 'status']
        }]
    });
    return UserReview;
};