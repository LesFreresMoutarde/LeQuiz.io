'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TagQuestion extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Question, {
                foreignKey: 'questionId',
                as: 'question'
            });

            this.belongsTo(models.Tag, {
                foreignKey: 'tagId',
                as: 'tag'
            });
        }
    };
    TagQuestion.init({
        questionId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        tagId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        }
    }, {
        sequelize,
        modelName: 'TagQuestion',
        tableName: 'tag_question',
    });
    TagQuestion.removeAttribute('id');
    return TagQuestion;
};
