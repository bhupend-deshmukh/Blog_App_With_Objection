const express = require("express");
const userRouter = express.Router();

const UserService = require("../services/users.service")
const service = new UserService()


userRouter.post('/signup',async(req,res)=>{
    const {first_name,last_name,email,password} = req.body
    if(first_name === undefined || last_name === undefined || email === undefined || password === undefined){
        return res.send({status:false,message:'body data is empty...'})
    }
    const result = await service.SignUp({first_name,last_name,email,password})
    res.send(result)
})

userRouter.get("/login",async(req,res)=>{
    const {email,password} = req.body
    if(email === undefined || password === undefined){
        return res.send({status:false,message:'body data is empty...'})
    }
    const result = await service.Login({email,password})
    res.cookie("token", result.token).send(result)
})


module.exports = userRouter