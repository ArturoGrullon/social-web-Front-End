module.exports.validateRegister = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === ''){
        errors.username = 'username must not be empty'
    }
    if(email.trim() === ''){
        errors.email = 'Email must not be empty'
    } else {
        //Validating email format 
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            errors.email = 'Email must be a valid email addres'
        }
    }
    if(password === ''){
        errors.password = 'Password must not be empty'
    } else if (password !== confirmPassword){
        errors.confirmPassword = 'Passwords must match'
    }

    return {
        errors,
        //If the lenght of the errors is less than one, means there's no errors 
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLogin = (username, password) => {
    const errors = {}
    if (username.trim() === ''){
        errors.username = 'Username must not be empty'
    }
    if (password.trim() === ''){
        errors.password = 'Password must not be empty'
    }

    return {
        errors,
        //If the lenght of the errors is less than one, means there's no errors 
        valid: Object.keys(errors).length < 1
    }
}