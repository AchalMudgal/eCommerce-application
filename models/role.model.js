//This will contain schema details of roles

const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");



module.exports = (sequelize,Sequelize) =>{
    const Role = sequelize.define("roles",{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true
        },
        name : {
            type : Sequelize.STRING
        }
    });
    return Role;
}