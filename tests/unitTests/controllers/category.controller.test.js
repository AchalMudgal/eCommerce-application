const {mockRequest, mockResponse} = require("../interceptor");
const newCategory = require("../mockData/newCategory.json");
const Category = require("../../../models").category;
const categoryController = require("../../../controllers/category.controller");



//Test the functionality of creating catagory

//Before the testing is done , we need to have the req and res objects

//Normally req and res ,will be passed by route layer , but here snice there is no routes we nneed to create mock res and req

//Mocked req and res is provided by interceptor.js file


let req, res;
beforeEach(()=>{
    req = mockRequest();
    res = mockResponse();
})


describe("Testing create category method", ()=>{

    beforeEach(()=>{
        //for creating the category, req should have a body
        req.body = newCategory
    })

    it('test successfull creation od anew category',async ()=>{


        //Mock and spy on Category create method
        const spy = jest.spyOn(Category,'create').mockImplementation((newCategory)=> Promise.resolve(newCategory));

        //Execute the create method

        await categoryController.create(req,res);

        //validation
        expect(spy).toHaveBeenCalled();

        expect(Category.create).toHaveBeenCalledWith(newCategory);

        expect(res.status).toHaveBeenCalledWith(201);

        expect(res.send).toHaveBeenCalledWith(newCategory);


    })

    //testing the failure case

    it("test failure during the creation of a new category",async ()=>{

        //Mock and spy
        const spy = jest.spyOn(Category, 'create').mockImplementation((newCategory)=> Promise.reject(Error("Error while creating")));

        //Execute the method
        await categoryController.create(req, res);

        await expect(spy).toHaveBeenCalled();
        await expect(Category.create).toHaveBeenCalledWith(newCategory);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            message : "Some internal error happend "
        });


    })
})

describe("Testing findAll method", ()=>{

    it("Test the findAll method when no query param was passed",async ()=>{
        //Mock the Category.findAll method
        const spy = jest.spyOn(Category, "findAll").mockImplementation(()=>Promise.resolve(newCategory));
        
        //Invoke the method
        await categoryController.findAll(req,res);

        //Validation
        expect(spy).toHaveBeenCalled();
        expect(Category.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newCategory);

    })

    it("Test the findAll method with the query param",async ()=>{
        const queryParam = {
            where : {
                name : "Electronics"
            }
        };

        const spy = jest.spyOn(Category, 'findAll').mockImplementation((queryParam)=>Promise.resolve(newCategory));

        req.query ={
            name : 'Electronics'
        }

        //Execute the method
        await categoryController.findAll(req,res);

        //Validation
        await expect(spy).toHaveBeenCalled();
        expect(Category.findAll).toHaveBeenCalledWith(queryParam);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newCategory);
    })
})

describe("Testing updates method", ()=>{
    it("Testing successfull update",async ()=>{
        req.body = newCategory;
        req.param = {
            id:1
        }
        //Category update method has to be mocked

        const spyOnUpdate = jest.spyOn(Category, 'update').mockImplementation(()=>Promise.resolve(newCategory));

        const spyOnFindByPk = jest.spyOn(Category,'findByPk').mockImplementation(()=>Promise.resolve());

        //Execute 
        await categoryController.update(req,res);
        
        //Validation

        await expect(spyOnUpdate).toHaveBeenCalled();
        await expect(spyOnFindByPk).toHaveBeenCalled();
        expect(Category.update).toHaveBeenCalled();
    })
})