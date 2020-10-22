'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class QuestionPosition extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    QuestionPosition.init({
        questionId: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'QuestionPosition',
        tableName: 'question_position',
        indexes: [{
            fields: ['position']
        }]
    });
    QuestionPosition.removeAttribute('id');
    return QuestionPosition;
};