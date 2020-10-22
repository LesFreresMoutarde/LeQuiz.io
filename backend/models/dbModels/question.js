'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.Category, {
                foreignKey: 'questionId',
                through: 'category_question',
                as: 'categories'
            });

            this.belongsTo(models.CustomQuiz, {
                foreignKey: 'customQuizId',
                as: 'customQuiz'
            });

            this.hasOne(models.QuestionPosition, {
                foreignKey: 'questionId',
                as: 'customQuizQuestionPosition',
                onDelete: 'CASCADE'
            });
        }
    }
    Question.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        type: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.STRING(30),
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        answer: {
            type: DataTypes.JSON,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        media: {
            type: DataTypes.JSON,
        },
        customQuizId: {
            type: DataTypes.UUID,
        }
    }, {
        sequelize,
        modelName: 'Question',
        tableName: 'question',
        indexes: [{
            fields: ['type', 'difficulty', 'status', 'customQuizId']
        }]
    });
    return Question;
};