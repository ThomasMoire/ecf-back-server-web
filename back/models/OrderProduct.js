const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

const Order = require('./Order');
const Product = require('./Product');

const OrderProduct = sequelize.define('OrderProduct', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    order_id : {
        type : DataTypes.INTEGER
    },
    product_id : {
        type : DataTypes.INTEGER
    },
    quantity : {
        type : DataTypes.INTEGER
    }
});

module.exports = OrderProduct;