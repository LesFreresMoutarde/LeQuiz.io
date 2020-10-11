'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CategoryCustomQuiz extends Model {
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

            this.belongsTo(models.CustomQuiz, {
                foreignKey: 'customQuizId',
                as: 'customQuiz'
            });
        }
    };
    CategoryCustomQuiz.init({
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        customQuizId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        }
    }, {
        sequelize,
        modelName: 'CategoryCustomQuiz',
        tableName: 'category_custom_quiz',
    });
    CategoryCustomQuiz.removeAttribute('id');
    return CategoryCustomQuiz;
};