const {DataTypes} = require('sequelize');
const Sequelize = require('sequelize');

const User = sequelize.define('User', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING
    },
    importance : {
        type : DataTypes.INTEGER
    }
});

module.exports = User;