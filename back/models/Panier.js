const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Order = require('./Order');
const Product = require('./Product');
const User = require('./User');

const Panier = sequelize.define('Panier', {
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

module.exports = Panier;