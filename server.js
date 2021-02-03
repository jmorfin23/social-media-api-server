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

const { login } = require('./handlers/user'); 

// User routes
app.post('/login', login); 





// // error handler middleware
// app.use((error, req, res, next) => {
//     console.log('error handler middleware'); 
//     console.log(error); 
//     // return json with an update back to update redux state. 
// }); 

app.listen(PORT, () => console.log(`App listening on port ${PORT}`)); 


