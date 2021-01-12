const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const PORT = process.env.PORT || 5001; 


app.use(bodyParser.json()); 

app.get('*', (req, res) => {
    res.json("this is the api server, received request!");
}); 

app.listen(PORT, () => console.log(`App listening on port ${PORT}`)); 


