'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomQuiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.UserReview, {
        foreignKey: 'custom_quiz_id',
        as: 'reviews',
        onDelete: 'RESTRICT'
      });

      this.belongsToMany(models.Category, {
        foreignKey: 'custom_quiz_id',
        through: 'category_custom_quiz',
        as: 'categories'
      });

      this.belongsTo(models.User, {
        foreignKey: 'author_id',
        as: 'author'
      })
    }
  };
  CustomQuiz.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authorId: {
      type: DataTypes.INTEGER
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
    underscored: true,
    indexes: [{
      fields: ['title', 'author_id', 'reviews_requested', 'status']
    }]
  });
  return CustomQuiz;
};