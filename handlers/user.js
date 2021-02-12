const jwt = require('jsonwebtoken'); 
const { validateLoginData, validateRegisterData } = require('../utility/validators');
const db = require('../models'); 
const bcrypt = require('bcrypt'); 

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

    // Validate register data 
    const { valid, errors } = validateRegisterData(newUser);   

    // Return errors if not valid 
    if (!valid) return res.status(400).json(errors); 

    // ___ ADDING NEW USER ___ // 
    try {

        // Hash password 
        const passwordHash = await bcrypt.hash(newUser.password, 10); 

        // Update db 
        var new_user = await db.user.create({ email: newUser.email, handle: newUser.handle, password: passwordHash }); 

    } catch(err) {
        return res.status(500).json({ general: err.errors[0].message })
    }

    // Create token 
    const token = jwt.sign({ uid: new_user.id}, process.env.SECRET_KEY); 

    // add to cookie 
    res.cookie('auth', token, { maxAge: 604800000 , httpOnly: true, signed: true } )

    // send to client 
    res.status(201).json(true)
}; 