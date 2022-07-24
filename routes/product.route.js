//This file will contain the REST URIs mapping with the controllers

const productController = require('../controllers/product.controller');
const {requestValidator,authJwt} = require('../middlewares');

module.exports = (app)=> {
    //Route for creating a new product
    app.post("/ecomm/api/v1/products",[authJwt.verifyToken,authJwt.isAdmin,requestValidator.validateProductRequest],productController.create);
    //Route for getting the list of all the products
    app.get("/ecomm/api/v1/products",productController.findAll);
    //Route for getting the product by id
    app.get("/ecomm/api/v1/products/:id",productController.findOne);
    //Route for updating the existing product
    app.put("/ecomm/api/v1/products/:id",[authJwt.verifyToken,authJwt.isAdmin], productController.update);
    //Route for deleting the product
    app.delete("/ecomm/api/v1/products/:id",[authJwt.verifyToken,authJwt.isAdmin], productController.delete);
}