const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); 
const PORT = process.env.PORT || 5001; 
require('dotenv').config()

app.use(cors()); 
app.use(cookieParser(process.env.SECRET_KEY)); 

app.get('/', (req, res) => {
    console.log('express api server'); 
}); 


// create middleware to check if the cookie is saved in the browser
// TODO: 

// if there is no cookie ... log them out 



app.use('/api', require('./routes.js')); 

app.listen(PORT, () => console.log(`App listening on port ${PORT}`)); 


