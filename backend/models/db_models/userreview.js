'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'reviewer_id',
        as: 'reviewer'
      });

      this.belongsTo(models.CustomQuiz, {
        foreignKey: 'custom_quiz_id',
        as: 'customQuiz'
      });
    }
  };
  UserReview.init({
    reviewerId: {
      type: DataTypes.INTEGER,
    },
    customQuizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'UserReview',
    tableName: 'user_review',
    underscored: true,
    indexes: [{
      fields: ['reviewer_id', 'custom_quiz_id', 'status']
    }]
  });
  return UserReview;
};