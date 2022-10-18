const Likes = require("../models/likes.model");
const Posts = require("../models/posts.model");

class Likeservice{
    
    async Create_like(data){
        try {
            let post_id = data.post_id
            let user_id = String(data.user_id)
            let like = data.like
            const postsData = await Posts.query().findById(post_id)
            if(postsData){
                let likes = await Likes.query().where({user_id,post_id})
                if(likes.length > 0){
                    let updaLike = await Likes.query().where({user_id,post_id}).patch({like})
                    return {status:true,message:'post liked successfully...'}
                }else{
                    const likeData = await Likes.query().insert({post_id,user_id,like:data.like})
                    return {status:true,message:'post liked successfully...'}
                }
            }else{
                return {status:false,message:'this post_id invalid...'}
            }
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = Likeservice