const { DATATYPES } = require('sequelize');
const Sequelize = require('sequelize');

const Product = sequelize.define('Product', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING
    },
    price : {
        type : DataTypes.FLOAT
    },
    fk_category_id : {
        type : DataTypes.INTEGER
    }
});

module.exports = Product;