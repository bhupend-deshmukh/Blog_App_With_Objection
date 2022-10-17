const express = require("express");
const postRouter = express.Router();
const { verifytoken } = require("../auth/auth");

const PostService = require("../services/posts.service")
const service = new PostService()

postRouter.post('/createPost',verifytoken,async(req,res)=>{
    const {title,description} = req.body
    if(title === undefined || description === undefined){
        return res.send({status:false,message:'body data is empty...'})
    }
    let user_id = res.tokendata.id;
    const result = await service.Create_Post({title,description,user_id})
    res.send(result)
})

postRouter.get('/getAllPost',verifytoken,async(req,res)=>{
    const result = await service.Get_All_Post()
    res.send(result)
})

postRouter.get('/getpost/:id',verifytoken,async(req,res)=>{
    let post_id = req.params.id
    const result = await service.Get_Post_id({post_id})
    res.send(result)
})

postRouter.delete('/deletePost/:id',verifytoken,async(req,res)=>{
    let post_id = req.params.id;
    let user_id = res.tokendata.id
    const result = await service.Delete_post_ID({post_id,user_id})
    res.send(result)
})

postRouter.put('/updatePost/:id',verifytoken,async(req,res)=>{
    let post_id = req.params.id;
    let user_id = res.tokendata.id
    const {title,description} = req.body
    if(title === undefined || description === undefined){
        return res.send({status:false,message:'body data is empty...'})
    }
    const result = await service.Update_Post({post_id,user_id,title,description})
    res.send(result)
})

module.exports = postRouter
