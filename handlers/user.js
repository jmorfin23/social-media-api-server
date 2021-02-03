const jwt = require('jsonwebtoken'); 
const { validateLoginData } = require('../utility/validators');

// Testing 
const data = {
    uid: "3kj41sl123lk123l4kj141", 
    name: 'Billy', 
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

    validateLoginData(user); 
    // For testing TODO: set up db w/ sequelize 
    if (user.email === data.email && user.password === data.password) {

         // Create token 
        const token = jwt.sign({ uid: data.uid }, process.env.SECRET_KEY); 

        // Sign cookie 
        res.cookie('auth', token, { maxAge: 604800000 , httpOnly: true, signed: true } )

        res.status(200).send(); 
    } else {
        res.status(403).json({ error: "invalid username or password" }); 
    }
}; 