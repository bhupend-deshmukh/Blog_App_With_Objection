const Posts = require('../models/posts.model')

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
                return {status:true,count:All_Data.length,post_data:All_Data}
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
                return {status:true,count:post_data.length,post_data}
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
                    return {status:true,message:'posts deleted successfully...'}
                }else{
                    return {status:false,message:'you dont have permissions this posts delete'}
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
                    return {status:false,message:'you dont have permissions this posts update...'}
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