const express = require('express'); 
const router = express.Router(); 
const bodyParser = require('body-parser'); 
const jsonParser = bodyParser.json(); 

const user = {
    id: 1, 
    name: 'Billy', 
    handle: 'user69', 
    url: 'https://placehold.it/250x250', 
}
router.get('/testroute', jsonParser, (req, res) => {

    if (req.headers.user === 'user69') {
        res.send(user)
    } else {
        res.send({error: 'user not found'})
    }
}); 


module.exports = router; 
