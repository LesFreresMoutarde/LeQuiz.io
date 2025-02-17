'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models.CustomQuiz, {
                foreignKey: 'categoryId',
                through: 'category_custom_quiz',
                as: 'customQuizzes'
            });

            this.belongsToMany(models.Question, {
                foreignKey: 'categoryId',
                through: 'category_question',
                as: 'questions'
            })
        }
    };
    Category.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        label: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        }
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'category',
    });
    return Category;
};
