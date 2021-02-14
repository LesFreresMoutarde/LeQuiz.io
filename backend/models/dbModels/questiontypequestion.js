'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class QuestionTypeQuestion extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.QuestionType, {
                foreignKey: 'questionTypeId',
                as: 'type'
            });

            this.belongsTo(models.Question, {
                foreignKey: 'questionId',
                as: 'question'
            });
        }
    }
    QuestionTypeQuestion.init({
        questionTypeId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        questionId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        }
    }, {
        sequelize,
        modelName: 'QuestionTypeQuestion',
        tableName: 'question_type_question',
    });
    QuestionTypeQuestion.removeAttribute('id');
    return QuestionTypeQuestion;
};
