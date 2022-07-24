/**
 * This file will have db relatred configs
 */

module.exports = {
    HOST: "localhost",
    USER : "root",
    PASSWORD : "mynameisachal21sep@1997",
    DB : "ecom_db",
    dialect : "mysql",
    pool : {
        max : 5,//MAXIMUMC ONNECTION POSSIBLE AT ANY TIME = 5 AT PEAK LOAD. 
        min : 0,
        acquire : 30000, //WAIT FOR 30000 MS BEFORE ABORTING A CONNECTION
        idle : 1000 
    }

}