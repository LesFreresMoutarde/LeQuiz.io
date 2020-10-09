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
        foreignKey: 'category_id',
        through: 'category_custom_quiz',
        as: 'customQuizzes'
      })
    }
  };
  Category.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'category',
    underscored: true,
    indexes: [{
      fields: ['name']
    }]
  });
  return Category;
};