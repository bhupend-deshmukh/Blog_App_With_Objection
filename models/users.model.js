const {Model} = require("objection")
const db = require("../config/db.connection")
Model.knex(db)

class Users extends Model{
    static get tableName(){
        return "users"
    }

    static get jsonSchema(){
        return {
            type:'object',
            required:['first_name', 'last_name', 'email', 'password'],
            properties:{
                id:{
                    type:'integer'
                },
                first_name:{
                    type:"string"
                },
                last_name:{
                    type:'string'
                },
                email:{
                    type:'string'
                },
                password:{
                    type:'string'
                }
            }
        }
    }
}

module.exports = Users;