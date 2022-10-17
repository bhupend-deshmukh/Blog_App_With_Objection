const {Model} = require("objection")
const db = require("../config/db.connection")
Model.knex(db)

class Likes extends Model{
    static get tableName(){
        return "likes"
    }

    static get jsonSchema(){
        return {
            type:'object',
            required:['post_id', 'like',],
            properties:{
                id:{
                    type:'integer'
                },
                post_id:{
                    type:"string"
                },
                like:{
                    type:'boolean'
                },
                user_id:{
                    type:'string'
                },
            }
        }
    }
}

module.exports = Likes;