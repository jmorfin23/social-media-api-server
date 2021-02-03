const jwt = require('jsonwebtoken');

// Check user cookie 
// TODO: 
module.exports = (req, res, next) => {

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
}