//This controller file will be used for authentication and autherization

const bcrypt = require('bcryptjs');
const { user } = require('../models');

const db = require('../models');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');

const secretKey = require('../configs/secret.config');

//Handler for signUp

exports.signup = (req,res) =>{
    //read the request body and create user object
    
    const userObj = {
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8) //need to encrypt this
    }

    //Persist this user object to the db
    User.create(userObj).then(user=>{
        console.log("user created");

        //Now to provide Correct role to the user
        if(req.body.roles){
            //Check if the desired role match with the supported roles
            Role.findAll({
                where : {
                    name : {
                        [Op.or] : req.body.roles
                    }
                }
            }).then(roles =>{
                
                //Set these roles with user
                user.setRoles(roles).then(()=>{
                    console.log("registration completed");
                    res.status(201).send({
                        message : "User successfully registerd"
                    })
                })

            })
        }else{
            user.setRoles([1]).then(()=>{
                console.log("registration completed");
                res.status(201).send({
                    message : "User successfully registerd"
                })
            })
        }
    }).catch(err =>{
        console.log("Error while creating the user",err.message);
        res.send(500).send({
            message : "Some internal error"
        })
    })
}





//Handler for signIn

exports.signin = (req,res) =>{
    //Check if the user exist

    User.findOne({
        where : {
            email : req.body.email
        }
    }).then(user =>{
        if(!user){
            res.status(404).send({
                message : "User not found"
            })
            return;
        }

        //Verify the password

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid){
            res.status(401).send({
                message : "Invalid password"
            })
            return;
        }

        //Need to genrate access token

        var token = jwt.sign({id : user.id} ,secretKey.secret, {
            expiresIn : 300 // token key expery period
        });

        //Provide roles to the user in response
        var authorities = [];
        user.getRoles().then(roles => {
            for(i=0;i<roles.length;i++){
                authorities.push("ROLE_"+roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id : user.id,
                username : user.username,
                email : user.email,
                roles : authorities,
                accessToken : token
            })
        });  
    }).catch(err => {
        res.status(500).send({
            message : "Internal error while signin"
        })
    })
}