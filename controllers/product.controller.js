//This is a controller class for product resource


//HANDLER FOR CREATE A NEW PRODUCT REQUEST
const { product } = require('../models');
const db = require('../models');
const Product  = db.product; 

exports.create = (req, res)=>{
    //try to create product object

    //fetching the data from the request body
    const prod = {
        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost,
        categoryId : req.body.categoryId
    }

    //Store this in the db
    Product.create(prod).then(product =>{
        console.log(`product name : ${prod.name} got inserted in the db`);
        res.status(201).send(product);
    }).catch(err =>{
        console.log(`Error in inserting the product name : ${prod.name}`);
        res.status(500).send({
            message : "Some internal error happend "
        })
    });
}

//handler for getting all the product

exports.findAll = (req,res) =>{

    const productName = req.query.name;
    var promise;
    
    if(productName){
        promise = Product.findAll({
            where : {
                name : productName
            }
        })
    }else{
        promise = Product.findAll();
    }
    

    promise.then(products =>{
        res.status(200).send(products);
    }).catch(err =>{
        res.status(500).send({
            message : "Some internal error happend"
        })
    })
}

//Handler for gettting the products based on the id


exports.findOne = (req,res) =>{
    const productId = req.params.id;

    Product.findByPk(productId).then(productId =>{
        res.status(200).send(productId);
    }).catch(err =>{
        res.status(500).send({
            message:"Some internal error happend"
        })
    })
}

//Provide support for updating the product

exports.update = (req,res) =>{
    //i need parse the request body ,just like post
    const product = {
        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost
    }
    //I need to know which product has to be updated
    const productId = req.params.id;

    //Its time to update the product
    Product.update(product,{
        where :{id : productId},
        returning : true
    }).then(updatedProduct =>{
        console.log(updatedProduct);

        // //I need to return the updated product
        Product.findByPk(productId).then(productRes =>{
            res.status(200).send(productRes);
        }).catch(err=>{
            res.status(500).send({
                message : "Some internal error happend"
            })
        })

    }).catch(err =>{ 
        res.status(500).send({
            message : "Some internal new error happend"
        })
    })
}


//Deleting the product

exports.delete = (req, res)=>{
    const productId = req.params.id;

    Product.destroy({
        where : {
            id :  productId
        }
    }).then(result =>{ 
        res.status(200).send({
            message : "Successfully deleted"
        })
    }).catch(err =>{
        res.status(500).send({
            message:"Some internal error happend"
        })
    })
} 