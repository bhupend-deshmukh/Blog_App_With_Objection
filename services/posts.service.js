const Likes = require('../models/likes.model');
const Posts = require('../models/posts.model');
const Users = require('../models/users.model');

class Postservice{

    async Create_Post(data){
        console.log(data.title,data.description,data.id);
        try {
            let create_pos = await Posts.query().insert({title:data.title,description:data.description,user_id:data.user_id})
            return {status:true,message:"post created successfully...", user_post: create_pos}
        } catch (error) {
            console.log(error.message);
        }
    }

    async Get_All_Post(data){
        try {
            let All_Data = await Posts.query()      
            if(All_Data.length > 0){
                const new_arr = []      
                for(let ind=0;ind < All_Data.length;ind++){
                    let user_id = All_Data[ind].user_id
                    let likes = await Likes.query().where({post_id:All_Data[ind].id})
                    let user = await Users.query().findById(user_id)
                    let new_data = {
                        post:All_Data[ind],
                        likes:likes.length,
                        post_user:{
                            first_name:user.first_name,
                            last_name:user.last_name
                        }
                    }
                    new_arr.push(new_data)
                }
                return {status:true,count:All_Data.length,post_data:new_arr}
            }else{
                return {status:false,message:"don't have any post exists..."}
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async Get_Post_id(data){
        try {
            let post_id = parseInt(data.post_id)
            const post_data = await Posts.query().findById(post_id)
            if(post_data){
                const likes = await Likes.query().where({post_id:post_id,like:1})
                const post_created_user = await Users.query().findById(post_data.user_id)
                
                return { 
                    status:true,
                    post_data,likes:likes.length,
                    post_user:{first_name:post_created_user.first_name,
                        last_name:post_created_user.last_name
                    }
                }
            }
            else{
                return {status:false,message:"id not found......"}
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async Delete_post_ID(data){
        try {
            let post_id = parseInt(data.post_id)
            let user_id = parseInt(data.user_id)
            const postsData = await Posts.query().findById(post_id)
            if(postsData){
                if(postsData.user_id == user_id){
                    const delPost = await Posts.query().deleteById(post_id)
                    const delLike = await Likes.query().delete().where({post_id:post_id})
                    return {status:true,message:'posts deleted successfully...'}
                }else{
                    return {status:false,message:'you dont have permision for delete this post, because you are not owner this post....'}
                }
            }else{
                return {status:false,message:'id not found...'}
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async Update_Post(data){
        try {
            let post_id = parseInt(data.post_id)
            let user_id = parseInt(data.user_id)
            const {title,description} = data
            const postsData = await Posts.query().findById(post_id)
            if(postsData){
                if(postsData.user_id == user_id){
                    const update_data = await Posts.query().findById(post_id).patch({title,description})
                    return {status:true,message:'data updated successfully...'}
                }else{
                    return {status:false,message:'you dont have permision for any details update this post, because you are not owner this post....'}
                }
            }else{
                return {status:false,message:'id not Found...'}
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = Postservice