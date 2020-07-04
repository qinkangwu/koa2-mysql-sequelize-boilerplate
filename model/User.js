const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const uuid = require('node-uuid');
class User extends Model {}
User.init({
    id : {
        type : Sequelize.STRING(100),
        primaryKey: true,
        allowNull : false
    },
    sex : {
        type : Sequelize.STRING(1),
        defaultValue : '0'
    },
    username: {
        type: Sequelize.STRING(100),
    },
    password: {
        type: Sequelize.STRING(100),
    }
},{
    sequelize,
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    modelName : 'user'
});

//创建表，默认是false，true则是删除原有表，再创建
User.sync();

module.exports = User;