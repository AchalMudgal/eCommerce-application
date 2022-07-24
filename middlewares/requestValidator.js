//This file will contain middleware for validating request body

const { category } = require("../models");

//Validate the request body for categories

const validateCategoryRequest = (req,res,next)=>{
    console.log(req.body);
    //Check for name
    if(!req.body.name){
        res.status(400).json({
            message : "Name of the category is not provided"
        });
        return;
    }

    //Cheak for description
    
    if(!req.body.description){
        res.status(400).send({
            message : "Description of the category is not provided"
        });
        return;
    }

    //Go to the controller
    next();
}


//Validator for the products request body

const validateProductRequest = (req,res,next) =>{
    //Check for name
    if(!req.body.name){
        res.status(400).send({
            message : "Name of the product is not provided"
        });
        return;
    }
    //Check for description
    if(!req.body.description){
        res.status(400).send({
            message : "Description of the product is not provided"
        });
        return;
    }
    //cheack for cost
    if(!req.body.cost || req.body.cost <= 0){
        res.status(400).send({
            message : "Cost doesn't seem to be in place"
        });
        return;
    }

    //validation for category id
    if(req.body.categoryId){
        //Check if it's valid value
        category.findByPk(req.body.categoryId).then(category =>{
            if(!category){
                res.status(400).send({
                    message:"Category id doesn't seem to be valid"
                });
                return;
            }
            next();
        })
    }else{
        res.status(400).send({
            message:"CategoryId doesn't seem to be in the place"
        });
        return;
    }
     
}


module.exports = {
    validateCategoryRequest : validateCategoryRequest,
    validateProductRequest : validateProductRequest
}