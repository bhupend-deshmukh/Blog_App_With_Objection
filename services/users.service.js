const Users = require("../models/users.model");
const jwt = require('jsonwebtoken')
class Userservice{
    async SignUp(data){
        try{
            const presentData = await Users.query().where({email:data.email})
            if(presentData.length == 0){
                await Users.query().insert(data)
                return {status:"true",message:"user SIGNUP successfully.....",Users:data}
            }else{
                return {status:false,message:"this email users allready exists....."}
            }
        }catch(err){
            console.log({err})
            return {'status':false,message:err.message}
            
        }
    }

    async Login(data){
        try {
            const presentData = await Users.query().where({email:data.email})
            if(presentData.length > 0){
                const token = jwt.sign({ id: presentData[0].id }, process.env.SECRET_KEY);
                return  {status: true,message: "Login Successfully...",user: presentData[0],token: token};
            }else{
                return {status:false,message:"invalid Email or Password....."}
            }
        } catch (error) {
            return {status:false,message:error.message}
        }
    }
}

module.exports = Userservice