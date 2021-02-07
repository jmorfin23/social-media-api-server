const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); 
const PORT = process.env.PORT || 5001; 
const jwt = require('jsonwebtoken'); 
const db = require('./models'); 
require('dotenv').config()

app.use(cors()); 
app.use(cookieParser(process.env.SECRET_KEY)); 
app.use(bodyParser.json()); 

const { login, register } = require('./handlers/user'); 

// User routes
app.post('/login', login); 
app.post('/register', register); 

// Post routes 

db.sequelize.authenticate().then(() => {
    console.log('connection set up successful!')
}).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`)); 
}); 



