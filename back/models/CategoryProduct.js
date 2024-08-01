const { Datatypes } = require('sequelize');
const Sequelize = require('sequelize');

const Category = sequelize.define('Category', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : DataTypes.STRING
    },
    parent_id : {
        type : DataTypes.INTEGER
    }
});