'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CategoryQuestion extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                as: 'category'
            });

            this.belongsTo(models.Question, {
                foreignKey: 'questionId',
                as: 'question'
            });
        }
    };
    CategoryQuestion.init({
        categoryId: {
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
        modelName: 'CategoryQuestion',
        tableName: 'category_question',
    });
    CategoryQuestion.removeAttribute('id');
    return CategoryQuestion;
};