
const jwt = require("jsonwebtoken");
const config = require("../configs/secret.config");

const db = require("../models");
const User  = db.user;

//Logic to validate the access token 

verifyToken = (req,res,next)=>{
   
    //Read the token from headers
    var token = req.headers['x-access-token'];  
    
    
    if(!token){
        return res.status(403).send({
            message : "No token provided"
        });

    }


    //Check the validity of the token
    jwt.verify(token,config.secret , ( err, decodedToken)=>{
        if(err){
            res.status(401).send({
                message : "Unauthorized"
            });
            return;
        }
        
        req.userId = decodedToken.id; //Reading the user from the token and setting it in the req obj
        next();
    })
}

isAdmin =(req,res,next)=>{
    //using userid we'llfetch the user object from db and check the user type

    User.findByPk(req.userId).then(user =>{
        user.getRoles().then(roles=>{
            for(let i=0;i<roles.length;i++){
                if(roles[i].name =='admin'){
                    next();
                    return;
                }
            }

            res.status(403).send({
                message : "Requires ADMIN role"
            });
            return;  
        })
    })
}



const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
}
module.exports = authJwt;