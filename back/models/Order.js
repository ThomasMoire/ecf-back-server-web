const { Datatypes } = require('sequelize');
const Sequelize = require('sequelize');
const Product = require('./Product');
const User = require('./User');

const Order = sequelize.define('Order', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    user_id : {
        type : DataTypes.INTEGER
    },
    total : {
        type : DataTypes.FLOAT
    }
});

module.exports = Order;