const {Model} = require("objection")
const db = require("../config/db.connection")
Model.knex(db)

class Posts extends Model{
    static get tableName(){
        return "posts"
    }

    static get jsonSchema(){
        return {
            type:'object',
            required:['title', 'description'],
            properties:{
                id:{
                    type:'integer'
                },
                title:{
                    type:"string"
                },
                description:{
                    type:'string'
                },
                user_id:{
                    type:'integer'
                },
            }
        }
    }
}
module.exports = Posts;