'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Question extends Model {

        static TYPE_QCM = 'qcm';
        static TYPE_INPUT = 'input';
        static TYPE_POINT_AND_CLICK = 'point_and_click';
        static TYPE_BLIND_TEST_QCM = 'blind_test_qcm';
        static TYPE_BLIND_TEST_INPUT = 'blind_test_input';
        static TYPES = [
            Question.TYPE_QCM,
            Question.TYPE_INPUT,
            Question.TYPE_POINT_AND_CLICK,
            Question.TYPE_BLIND_TEST_QCM,
            Question.TYPE_BLIND_TEST_INPUT
        ];

        static STATUS_APPROVED = 'approved';
        static STATUS_PENDING = 'pending';
        static STATUS_DISAPPROVED = 'disapproved';
        static STATUSES = [Question.STATUS_APPROVED, Question.STATUS_PENDING, Question.STATUS_DISAPPROVED];

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

            this.belongsToMany(models.QuestionType, {
                foreignKey: 'questionId',
                through: 'question_type_question',
                as: 'questionTypes'
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
