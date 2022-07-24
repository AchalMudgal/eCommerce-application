//Validation for duplicate email or username

const db = require('../models');
const User = db.user;
const ROLES = db.ROLES;

const checkDuplicateUsernameOrEmail = (req,res,next) =>{


    //Check for username
    User.findOne({
        where : {
            username : req.body.username
        }
    }).then(user =>{
        if(user){
            res.status(400).send({
                message : "Failed !, Username already exists "
            });
            return
        }
        //If user is not already present ,then also validate for email
        //Check for email
        User.findOne({
            where : {
                email : req.body.email
            }
        }).then(user =>{
            if(user){
                res.status(400).send({
                    message : "Failed !, Email already exists"
                });
                return;
            }
            next(); 
        })
    })  
}


//Validation for correct roles
const cheackRolesExisted = (req,res,next) =>{
    if(req.body.roles){
        //Iterate through the roles provided by the customer and check if it's valid

        for(let i=0; i < req.body.roles.length; i++){
            //Check if the req.body.roles[i] is present in allowed list of roles
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message : "Failed ! Role doesn't exist"+ req.body.roles[i]
                })
                return;
            }
        }
    }
    next();
}



//exporting 
const verifySignup = {
    checkDuplicateUsernameOrEmail : checkDuplicateUsernameOrEmail,
    cheackRolesExisted : cheackRolesExisted
}

module.exports = verifySignup;




