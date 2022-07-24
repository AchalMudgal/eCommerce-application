//THIS FILE WILL EXPOSE THE FUNCTIONALITIES OF ALL THE MODEL FILES DEFINED UNDER THE MODELS DIRECTORY 


// NOW, TO CREATE THE CONNECTION WITH THE DATABASE

const Sequelize = require('sequelize');
const config = require('../configs/db.config');


// CREATING THE DB CONNECTION

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host : config.HOST,
        dialect : config.dialect,
        pool : {
            max : config.pool.max,
            min : config.pool.min,
            acquire : config.pool.acquire,
            idle : config.pool.idle
        }
    }
);

// I NEED TO EXPOSE THE SEQUELISE AND CATEGORY MODEL

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require('./category.model')(sequelize,Sequelize);
db.product = require('./product.model')(sequelize,Sequelize);
db.user = require('./user.model')(sequelize,Sequelize);
db.role = require('./role.model')(sequelize,Sequelize);
db.cart = require('./cart.model')(sequelize,Sequelize);

//Many to many relationships

db.role.belongsToMany(db.user, {
    through : "user_roles",
    foreignKey : "role_id" ,
    otherKey : "user_id"
});

db.user.belongsToMany(db.role,{
    through : "user_roles",
    foreignKey : "user_Id",
    otherKey : "role_id"
});


//Establish the relation between user and cart(i.e, one to many)
 
db.user.hasMany(db.cart);

//Establish the relation between cart and product(i.e, many to many)

db.product.belongsToMany(db.cart,{
    through : "cart_products",
    foreignKey : "productId",
    otherKey : "cartId"
});

db.cart.belongsToMany(db.product,{
    through : "cart_products",
    foreignKey : "cartId",
    otherKey : "productId"
}) 





//List of valid roles

db.ROLES = ["customer","admin"];


module.exports = db;