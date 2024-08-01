const {Sequelize} = require('sequelize');

const login = {
    database : 'macdonalds',
    username : 'root',
    password : 'root',
    host : 'localhost',
    dialect : 'mysql'
};

const sequelize = new Sequelize(login.database, login.username, login.password,{
    host : 'localhost',
    dialect : 'mysql',
    port : '3306'
});

module.exports = sequelize;

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const {Category} = require('./Category');
const {Product} = require('./Product');
const {CategoryProduct} = require('./CategoryProduct.js');
const {User} = require('./User');
const {Order} = require('./Order');
const {OrderProduct} = require('./OrderProduct');

Product.belongsToMany(Category, {through: CategoryProduct});
Category.belongsToMany(Product, {through: CategoryProduct});
Order.belongsToMany(Product, {through: OrderProduct});
Product.belongsToMany(Order, {through: OrderProduct});
User.hasMany(Order);

sequelize.sync({})
    .then(() => {
        console.log('Tables created successfully.');
    })
    .catch(err => {
        console.error('Unable to create table:', err);
    });