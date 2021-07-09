'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Question, {
        foreignKey: 'tagId',
        through: 'tag_question',
        as: 'questions'
      });
    }
  };
  Tag.init({
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
    },
    label: {
      type: DataTypes.STRING(80),
      unique: true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'tag',
    indexes: [{
      fields: ['name', 'label']
    }]
  });
  return Tag;
};
