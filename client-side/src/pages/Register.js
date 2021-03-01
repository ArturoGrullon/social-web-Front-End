import React, { useContext, useState } from 'react'
import {Button, Form} from 'semantic-ui-react'
import {gql, useMutation} from '@apollo/client'

import {useForm} from '../Util/hooks'
import { AuthContext } from '../Context/auth';
function Register(props) {
    const [errors, setErrors] = useState({});
    const context = useContext(AuthContext)

    const { onChange, onSubmit, values} = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            context.login(result.data.register)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception)
        },
        variables: values
    })

    function registerUser(){
        addUser()
    }


    return (
        <div className = 'register-container'>
            <Form onSubmit= {onSubmit} noValidate className= {loading ? 'loading': ''}>
                <h1> Register </h1>
                <Form.Input 
                    label = '- Username'
                    placeholder = 'Username..'
                    name = 'username'
                    type = 'text'
                    value = {values.username}
                    error = {errors.username ? true : false}
                    onChange = {onChange}
                />

                <Form.Input 
                    label = '- Email'
                    placeholder = 'Email..'
                    name = 'email'
                    type = 'email'
                    value = {values.email}
                    error = {errors.email ? true : false}
                    onChange = {onChange}
                />

                <Form.Input 
                    label = '- Password'
                    placeholder = 'Password..'
                    name = 'password'
                    type = 'password'
                    value = {values.password}
                    error = {errors.password ? true : false}
                    onChange = {onChange}
                />

                <Form.Input 
                    label = '- Confirm Password'
                    placeholder = 'Confirm Password..'
                    name = 'confirmPassword'
                    type = 'password'
                    value = {values.confirmPassword}
                    error = {errors.confirmPassword ? true : false}
                    onChange = {onChange}
                />

                <Button type='submit' primary> 
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && 
            (<div className = 'ui error message'>
                <ul className= 'list'>
                    {Object.values(errors).map(value => (
                        value !== 'stacktrace'
                        ? <li key={value}> {value} </li>
                        : ''
                    ))}
                </ul>
            </div>)}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register (
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
    register(
        registerInput:{
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
        })
        {
            id
            email
            token
            username
            createdAt
        }
    }
    `

export default Register;