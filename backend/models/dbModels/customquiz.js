'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CustomQuiz extends Model {

        static STATUS_APPROVED = 'approved';
        static STATUS_PENDING = 'pending';
        static STATUS_DISAPPROVED = 'disapproved';
        static STATUSES = [CustomQuiz.STATUS_APPROVED, CustomQuiz.STATUS_PENDING, CustomQuiz.STATUS_DISAPPROVED];

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.UserReview, {
                foreignKey: 'customQuizId',
                as: 'reviews',
                onDelete: 'RESTRICT'
            });

            this.hasMany(models.Question, {
                foreignKey: 'customQuizId',
                as: 'questions',
                onDelete: 'RESTRICT'
            });

            this.belongsToMany(models.Category, {
                foreignKey: 'customQuizId',
                through: 'category_custom_quiz',
                as: 'categories'
            });

            this.belongsTo(models.User, {
                foreignKey: 'authorId',
                as: 'author'
            })
        }
    };
    CustomQuiz.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authorId: {
            type: DataTypes.UUID
        },
        reviewsRequested: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'CustomQuiz',
        tableName: 'custom_quiz',
        indexes: [{
            fields: ['title', 'authorId', 'reviewsRequested', 'status']
        }]
    });
    return CustomQuiz;
};