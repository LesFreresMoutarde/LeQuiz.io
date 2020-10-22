'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static PLAN_FREE = 'free';
        static PLAN_PREMIUM = 'premium';
        static PLAN_VIP = 'vip';
        static PLANS = [User.PLAN_FREE, User.PLAN_PREMIUM, User.PLAN_VIP];

        static ROLE_MEMBER = 'member';
        static ROLE_REVIEWER = 'reviewer';
        static ROLE_ADMIN = 'admin';
        static ROLES = [User.ROLE_MEMBER, User.ROLE_REVIEWER, User.ROLE_ADMIN];

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Subscription, {
                foreignKey: 'userId',
                as: 'subscriptions',
                onDelete: 'RESTRICT'
            });

            this.hasMany(models.UserReview, {
                foreignKey: 'reviewerId',
                as: 'reviews',
                onDelete: 'RESTRICT'
            });

            this.hasMany(models.CustomQuiz, {
                foreignKey: 'authorId',
                as: 'customQuizzes',
                onDelete: 'RESTRICT'
            });
        }
    };
    User.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(191),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plan: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        isTrustyWriter: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        unbanDate: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        paranoid: true,
        indexes: [{
            fields: ['username', 'email', 'plan']
        }]
    });
    return User;
};