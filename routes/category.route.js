//This file will be responsible for routing the request to the correct controller method

const controller = require('../controllers/category.controller');
const {requestValidator, authJwt} = require('../middlewares');


module.exports = function(app){

    //Route for creating a new category
    app.post('/ecomm/api/v1/categories',[authJwt.verifyToken,authJwt.isAdmin ,requestValidator.validateCategoryRequest], controller.create);
    //Route for getting all the categories
    app.get('/ecomm/api/v1/categories', controller.findAll);
    //Route for getting the category based on the category id
    app.get('/ecomm/api/v1/categories/:id',controller.findOne);
    //Route for updating the category
    app.put('/ecomm/api/v1/categories/:id',[authJwt.verifyToken,authJwt.isAdmin,requestValidator.validateCategoryRequest],controller.update);
    //Route for deleting the category
    app.delete('/ecomm/api/v1/categories/:id',[authJwt.verifyToken,authJwt.verifyToken],controller.delete);
    
}  

