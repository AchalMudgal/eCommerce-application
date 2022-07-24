const bodyParser = require('body-parser');
const express = require('express');
const serverConfig = require('./configs/server.config');
const { create } = require('./controllers/category.controller');

const app = express();

//Registering body-parser middleware
app.use(bodyParser.json());


//CODE FOR THE TABLE INTIALIIZATION

const db = require('./models');
const Category = db.category;
const Product = db.product;
const Role = db.role;

console.log(Category);

//Setup the relationship between the tables
Category.hasMany(Product);//1 to many relationship

//CREATE THE TABLE
db.sequelize.sync({force:true}).then(()=>{
    console.log("table dropped and recreated");
    init();
}).catch(err=>{
    console.log(err.message);
});


//This function should be executed at the begning of the app startup

function init(){

    //Create some initial categories
    //Bilk insert in Sequalize
    var categories =[
        {
            name : "Electronics",
            description : "This category will contain all the electronics products"
        },
        {
            name : "Kitchen Items",
            description : "This contain all the kitchen related items"
        }
    ]; 

    Category.bulkCreate(categories).then(()=>{
        console.log('categories are added');
    }).catch(err =>{
        console.log('Error in initializing the categories',err.message);
    });

    //Create the roles

    Role.create({
        id : 1,
        name : "customer"
    });

    Role.create({
        id : 2,
        name : "admin"
    });
}

//Initialize the routes
require('./routes/category.route')(app); 
require('./routes/product.route')(app);
require('./routes/auth.route')(app);
require('./routes/cart.route')(app);


app.listen(serverConfig.PORT,()=>{
    console.log("Application started on port no:", serverConfig.PORT)
});