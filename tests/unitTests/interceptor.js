//This file will have the logic to mock req and res



//Mocked req

module.exports ={
    mockRequest : () =>{
        const req = {};
        //body
        //params
        //query
        req.body = jest.fn().mockReturnValue(req);//mock the req body field
        req.params = jest.fn().mockReturnValue(req);
        req.query = jest.fn().mockReturnValue(req);
        return req;
    },

    //Mocked res

    mockResponse : () =>{
        const res ={};
        //status
        //send
        res.status = jest.fn().mockReturnValue(res);
        res.send =jest.fn().mockReturnValue(res);
        return res;
    }
}




