// THIS FILE WILL CONTAIN SCHEMA DEFINATION FOR THE CATEGORY RESOURCE
//WE WOULD LIKE TO EXPORT THIS SCHEMA TO BE CALLED FROM OTHER MODULE

const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
    const Category = sequelize.define("category",{
        id: {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : Sequelize.STRING,
            allowNull : false
        },
        description : {
            type : Sequelize.STRING
        }
    },
    {
        tableName : 'categories'
    });
    return Category;
}