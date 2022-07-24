
const authController = require('../controllers/auth.controller');

const {verifySignup} = require('../middlewares');

//Define the routs for user creation

module.exports = (app) =>{
    app.post("/ecomm/api/v1/signup",[verifySignup.checkDuplicateUsernameOrEmail,verifySignup.cheackRolesExisted], authController.signup);
    app.post("/ecomm/api/v1/signin", authController.signin);
}