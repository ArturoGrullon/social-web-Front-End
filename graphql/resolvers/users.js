const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {KEY} = require('../../config')
const {UserInputError} = require('apollo-server')
const {validateRegister, validateLogin} = require('../../util/validators')


function generateToken(user){
    return jwt.sign({
                id: user.id,
                email: user.email,
                username: user.username
            }, 
            KEY, {expiresIn: '1h'})
            
}

module.exports = {
    Mutation: {
        async login(_, {username, password}){
            const {errors, valid} = validateLogin(username, password);
            const user = await User.findOne({username});

            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors});
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'Wrong Password'
                throw new UserInputError('Wrong Password', {errors})
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(
            _, 
            {
                registerInput: {username, email, password, confirmPassword}
            }, 
        )   {
            //Todo: validate user data
            const {valid, errors} = validateRegister(username, email, password, confirmPassword)
            if(!valid){
                throw new UserInputError('Errors', errors)
            }
            //todo: make user user doesn't alredy exits 
            const user = await User.findOne({username});
            //If a user exists
            if(user){
                throw new UserInputError('Username already in use', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            //* hash password and create an auth token
            password = await bcrypt.hash(password,12);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });;

            const res = await newUser.save()
            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };
        } 
    }
}