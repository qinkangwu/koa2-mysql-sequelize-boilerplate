const Sequelize = require("sequelize");
const sequelize = require('../config/db');
const uuid = require('node-uuid');
const User = sequelize.define('users', {
    id : {
        type : Sequelize.STRING(100),
        primaryKey: true,
        defaultValue : uuid.v1()
    },
    sex : {
        type : Sequelize.STRING(1),
        defaultValue : '0'
    },
    username: {
        type: Sequelize.STRING(100),
    },
    password: Sequelize.STRING(100),
},
{
	freezeTableName: true,
    timestamps: true,
    paranoid: true
});
//timestamp字段，默认为true，表示数据库中是否会自动更新createdAt和updatedAt字段，false表示不会增加这个字段。
//freezeTableName,默认为true,会自动给表名表示为复数: user => users，为false则表示，使用我设置的表名


//创建表，默认是false，true则是删除原有表，再创建
User.sync({
    force: false,
    alter : true
});

module.exports = User;