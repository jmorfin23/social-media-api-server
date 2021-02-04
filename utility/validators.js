

const isEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(re)) return true; 
    else return false; 
}; 

const isEmpty = string => {
    if (string.trim() === "") return true
    else return false; 
}; 


exports.validateLoginData = data => {
    let errors = {}; 

    if (isEmpty(data.email)) errors.email = 'Must not be empty'
    if (isEmpty(data.password)) errors.password = 'Must not be empty'

    return {
        valid: Object.keys(errors) <= 0,  
        errors
    }
}; 


exports.validateRegisterData = data => {
    let errors = {}; 

    if (isEmpty(data.email)) errors.email = 'Must not be empty'
    else if (!isEmail(data.email)) errors.email = 'Must be a valid email'; 
    
    if (isEmpty(data.handle)) errors.handle = 'Must not be empty'

    if (isEmpty(data.password)) errors.password = 'Must not be empty'
    else if (data.password !== data.confirmPassword) {
        errors.password = 'Passwords must match'
        errors.confirmPassword = 'Passwords must match'
    }


    return {
        valid: Object.keys(errors) <= 0,  
        errors
    }
}; 