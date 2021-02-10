const User = require('../../models/User')

module.exports = {
    Mutation: {
        register(_,args, context, info){
            //Todo: validate user data
            //todo: make user user doesn't alredy exits 
            //todo: hash password and create an aith token
            
        }
    }
}