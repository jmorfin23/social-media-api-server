const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); 
const PORT = process.env.PORT || 5001; 
const jwt = require('jsonwebtoken'); 
require('dotenv').config()

app.use(cors()); 
app.use(cookieParser(process.env.SECRET_KEY)); 
app.use(bodyParser.json()); 

// Testing 
const user = {
    id: 1, 
    name: 'Billy', 
    handle: 'user69', 
    url: 'https://placehold.it/250x250', 
}

app.get('/', (req, res) => {
    console.log('express api server'); 
}); 


// Checks auth status log user out if false 
app.get('/current_user', (req, res) => {
    console.log('inside current user');
    // sets auth to true ? w/ user data? 
    res.send(); 
}); 

app.post('/login_user', (req, res) => {
    console.log(req.body); 

    // Verify username and password in db with sequelize ORM
    
    const { username, password } = req.body.data; 
    // ...code 

    // For testing TODO: set up db w/ sequelize 
    if (username === 'billy69' && password === 'password') {

         // Create token 
        const token = jwt.sign({ username: user.handle }, process.env.SECRET_KEY); 

        console.log('sending cooking to client'); 

        // send a signed cookie 
        // send json for auth 
        res.cookie('auth', token, { maxAge: 604800000 , httpOnly: true, signed: true } )

        // Login user w/ user data 
        res.status(200).json({ "login": true }); 
    } else {
        res.status(500).json({ "error": "invalid username or password" }); 
    }
}); 



// Middleware check /api routes for a cookie 
app.use((req, res, next) => {
    console.log(req.signedCookies); 

    // Retrieve token from cookie from client request 
    const auth = req.signedCookies.auth; 

    // Verify if token is present 
    if (auth) {

        // Check contents of cookie 
        jwt.verify(auth, process.env.SECRET_KEY, (err, data) => {
            console.log(data); 
            // Send err to error middleware 
            if (err) {
                console.log('error'); 
                // log user out 

                next(err);
            } else if (data.username) {
                // Check username in database 
                // ..
                next()
            }
        });
    }
}); 




// app.use('/api', require('./routes.js')); 

// error handler middleware
app.use((error, req, res, next) => {
    console.log('error handler middleware'); 
    console.log(error); 
    // return json with an update back to update redux state. 
}); 

app.listen(PORT, () => console.log(`App listening on port ${PORT}`)); 


