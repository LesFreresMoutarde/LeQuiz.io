'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class QuestionType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.Question, {
                foreignKey: 'questionTypeId',
                through: 'question_type_question',
                as: 'questions'
            })
        }
    };
    QuestionType.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'QuestionType',
        tableName: 'question_type',
    });
    return QuestionType;
};
