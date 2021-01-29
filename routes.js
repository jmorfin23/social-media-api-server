const express = require('express'); 
const router = express.Router(); 
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json(); 
const jwt = require('jsonwebtoken'); 


// Testing 
const user = {
    id: 1, 
    name: 'Billy', 
    handle: 'user69', 
    url: 'https://placehold.it/250x250', 
}

router.post('/login_user', jsonParser, (req, res) => {

    console.log('login user route!'); 

    // Verify username and password in db with sequelize ORM
    // ...code 
    const { username, password } = req.body.data; 

    // For testing TODO: set up db w/ sequelize 
    if (username === 'billy69' && password === 'password') {

         // Create token 
        const token = jwt.sign({ username: user.handle }, process.env.SECRET_KEY); 
    
        console.log('sending cooking to client'); 

        // send a signed cookie 
        res.cookie('auth', token, { maxAge: 604800000 , httpOnly: true, signed: true } ).send(); 
    } else {
        console.log('cookie not sent'); 
    }
}); 


module.exports = router; 
