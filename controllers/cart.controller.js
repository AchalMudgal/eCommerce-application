
const db = require('../models');
const Cart = db.cart;

const Product = db.product;

//Handler for creating the cart
exports.create = (req,res) =>{

    const cart = {
        userId : req.userId
    };

    //If the user has also provided the item  Id's while creating cart
    // const itemId = req.body.items;
    
    Cart.create(cart).then(cart=>{
        res.status(201).send(cart)
    }).catch(err=>{
        res.status(500).send({
            message : "Some internal error happend"
        })
    })
}



//Handler for updateing a cart

exports.update = (req,res)=>{
    //Figer out if the cart is present which needs to be updated
    const cartId = req.params.id;

    Cart.findByPk(cartId).then(cart =>{

        //Add the products passed in the request body to the cart

        var productIds = req.body.productIds;

        Product.findAll({
            where : {
                id : productIds
            }
        }).then(products =>{
            if(!products){
                res.status(400).send({
                    message : "Products trying to add doesn't exist"
                });
                return;
            }

            //Set these products inside the Cart
            cart.setProducts(products).then(()=>{
                console.log("Products succesfully added to the cart");
                //Take care of the cost part
                var cost = 0;
                var productsSelected = [];
                cart.getProducts().then(cartProducts =>{
                    
                    for( i=0;i<cartProducts.length;i++){
                        productsSelected.push({
                            id : cartProducts[i].id,
                            name : cartProducts[i].name,
                            cost : cartProducts[i].cost
                        });
                        cost = cost + cartProducts[i].cost;

                    }
                    //return the cart update response

                    res.status(200).send({
                        id : cart.id,
                        productsSelected : productsSelected,
                        cost : cost
                    })
                })
            })
        })
    }).catch(err =>{
        res.status(500).send({
            message : "Error while updating the cart"
        })
    })
}



//Search for cart based on the cart id 

exports.getCart = (req,res) =>{

    const cartId = req.params.cartId;

    Cart.findByPk(cartId).then(cart =>{
        var cost = 0;
        var productsSelected = [];
        cart.getProducts().then(cartProducts =>{
            
            for( i=0;i<cartProducts.length;i++){
                productsSelected.push({
                    id : cartProducts[i].id,
                    name : cartProducts[i].name,
                    cost : cartProducts[i].cost
                });
                cost = cost + cartProducts[i].cost;

            }
            //return the cart update response

            res.status(200).send({
                id : cart.id,
                productsSelected : productsSelected,
                cost : cost
            });
        });
    });
}