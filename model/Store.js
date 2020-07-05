const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
class Store extends Model {}
Store.init({
    id : {
        type : Sequelize.STRING(100),
        primaryKey: true,
        allowNull : false
    },
    storeName : {
        type : Sequelize.STRING(10),
        allowNull : false
    },
    log: {
        type: Sequelize.STRING(20),
        allowNull : false
    },
    lat: {
        type : Sequelize.STRING(20),
        allowNull : false
    }
},{
    sequelize,
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    modelName : 'store'
});

//创建表，默认是false，true则是删除原有表，再创建
Store.sync();

module.exports = Store;