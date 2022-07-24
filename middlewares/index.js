const requestValidator = require('./requestValidator');
const verifySignup = require('./verifySignup');
const authJwt = require('./authJwt');


//THIS IS RETURNING THE OBJECT
module.exports = {
    requestValidator,
    verifySignup,
    authJwt
}