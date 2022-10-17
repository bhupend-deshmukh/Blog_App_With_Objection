const express = require("express");
const { verifytoken } = require("../auth/auth");
const likesRouter = express.Router();

const LikesService = require("../services/likes.service");
const service = new LikesService();

likesRouter.post('/like',verifytoken,async(req,res)=>{ 
    const {post_id,like} = req.body
    let user_id = res.tokendata.id;
    const result = await service.Create_like({post_id,user_id,like})
    res.send(result)
})

module.exports = likesRouter