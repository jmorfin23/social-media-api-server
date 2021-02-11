const jwt = require('jsonwebtoken'); 
const { validateLoginData, validateRegisterData } = require('../utility/validators');
const db = require('./models'); 


// Testing purposes
// TODO: sequelize db 
const data = {
    uid: "3kj41sl123lk123l4kj141", 
    email: 'user69@user.com', 
    handle: 'user69', 
    imageUrl: 'https://placehold.it/250x250', 
    password: 'password',
    createdAt: 'random date'
}

exports.login = (req, res) => {

    const user = {
        email: req.body.email, 
        password: req.body.password
    }; 

    const { valid, errors } = validateLoginData(user); 

    if (!valid) return res.status(400).json(errors); 

    // For testing TODO: set up db w/ sequelize 
    
    if (user.email === data.email && user.password === data.password) {

         // Create token 
        const token = jwt.sign({ uid: data.uid }, process.env.SECRET_KEY); 

        // Sign cookie 
        res.cookie('auth', token, { maxAge: 604800000 , httpOnly: true, signed: true } )

        res.status(200).send(); 
    } else {
        res.status(403).json({ general: "invalid username or password" }); 
    }
}; 


exports.register = async(req, res) => {

    const newUser = {
        email: req.body.email, 
        handle: req.body.handle, 
        password: req.body.password, 
        confirmPassword: req.body.confirmPassword
    }; 

    const { valid, errors } = validateRegisterData(newUser);   

    if (!valid) return res.status(400).json(errors); 

    // Add to db
    // ... 
    // Get token 
    // ...

    // attach cookie to response 
    // ... 

    res.status(201).send()
}; 