const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const PORT = process.env.PORT || 5001; 


app.use(cors()); 

app.get('/', (req, res) => {
    res.json("this is the api server, received request!");
}); 

app.use('/api', require('./routes.js')); 

app.listen(PORT, () => console.log(`App listening on port ${PORT}`)); 


