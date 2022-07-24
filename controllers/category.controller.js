// THIS FILE WILL HAVE ALL THE LOGIC THAT IS NEEDED FOR THE PROCESSING OF REQUEST 

//HANDLER FOR CREATE A NEW CATEGORY REQUEST

const db = require('../models');
const Category  = db.category;

exports.create = (req, res)=>{
    //try to create category object
    //fetching the data from the request body
    const category = {
        name : req.body.name,
        description : req.body.description
    }

    //Store this in the db
    Category.create(category).then(category =>{
        console.log(`category name : ${category.name} got inserted in the db`);
        res.status(201).send(category);
    }).catch(err =>{
        console.log(`Issue in inserting the category name : ${category.name}. Error message:${err.message}`);
        res.status(500).send({
            message : "Some internal error happend "
        })
    });
}

//handler for getting all the categories

exports.findAll = (req,res) =>{
    
    //Query params : /ecomm/api/v1/categories?name=achal
    //To intercept the query params and use it

    const categoryName = req.query.name ;
    let promise ;
    if(categoryName){
        promise = Category.findAll({
            where : {
                name : categoryName
            }
        });
    }
    else{
        promise =  Category.findAll() ;
    }

    promise.then(categories =>{
        res.status(200).send(categories);
    }).catch(err =>{
        res.status(500).send({
            message : "Some internal error happend"
        })
    })
}

//Handler for gettting the categories based on the id

//127.0.0.1:8080/ecomm/api/v1/categories/:id

exports.findOne = (req,res) =>{
    const categoryId = req.params.id;

    Category.findByPk(categoryId).then(categoryId =>{
        res.status(200).send(categoryId);
    }).catch(err =>{
        res.status(500).send({
            message:"Some internal error happend"
        })
    })
}

//Provide support foe updating the category

exports.update = (req,res) =>{
    //i need parse the request body ,just like post
    const category = {
        name : req.body.name,
        description : req.body.description
    }
    //I need to know which category has to be updated
    const categoryId = req.params.id;

    //Its time to update the category
    Category.update(category,{
        where :{id : categoryId},
        returning : true
    }).then(updatedCategory =>{
        console.log(updatedCategory);

        // //I need to return the updated category
        Category.findByPk(categoryId).then(categoryRes =>{
            res.status(200).send(categoryRes);
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


//Deleting the category

exports.delete = (req, res)=>{
    const categoryId = req.params.id;

    Category.destroy({
        where : {
            id :  categoryId
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