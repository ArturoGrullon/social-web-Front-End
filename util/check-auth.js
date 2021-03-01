const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const {KEY} = require('../config');

module.exports = (context) => {
    //context = {... headers}
    const authHeader = context.req.headers.authorization;
    if(authHeader) {
        // Bearer ....
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token, KEY)
                return user;
            } catch(err){
                throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error('Authentication header must be \'Bearer [token]')
    }
    throw new Error('Authentication header must be provided')

}