//Test the signUp method

//When we provide the roles to a user
const {mockRequest, mockResponse} = require("../interceptor");
const authController = require("../../../controllers/auth.controller")
const newUser = require("../mockData/newUser.json");
const Models = require("../../../models");
const User = Models.user;
const Role = Models.role;


//Some kind of prep work before the tests are executed.

let req, res ;

beforeEach(()=>{
    //Whatever i write here, will be executed before every describe test
    req = mockRequest();
    res = mockResponse();
})


describe("Testing SignUp method of authController", ()=>{
    //1. Successfull sign up, When we provide the roles to a user
    it("Successfull signup, when we provide the roles to a user",async ()=>{
        //Testing logic will come here
        //provide some body to req
        req.body = newUser
         

        //Mock the user and role model

        const resFromCreate = {
            setRoles : async () => Promise.resolve()
        }
        const spyOnCreate = jest.spyOn(User,'create').mockImplementation(()=> Promise.resolve(resFromCreate));
        const spyOnFindAll = jest.spyOn(Role, 'findAll').mockImplementation(()=> Promise.resolve());
        
        //actual execution
        await authController.signup(req,res);//wait for singup method to complete

        //validating test passed or not
        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(User.create).toHaveBeenCalled();
        await expect(Role.findAll).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({message:"User successfully registerd"});
    })

})

