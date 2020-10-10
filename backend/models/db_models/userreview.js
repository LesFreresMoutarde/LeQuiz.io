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
        reviewerId: {
            type: DataTypes.INTEGER,
        },
        customQuizId: {
            type: DataTypes.INTEGER,
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