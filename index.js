var bodyParser = require('body-parser')
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var fs = require('fs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/front.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/json', function (req, res) {
    res.sendFile(path.join(__dirname + '/test.json'));
});



router.post('/change', function(req,res){
    console.log("postroute")
    console.log(req.body)
    fs.writeFileSync('test.json', JSON.stringify(req.body));
    res.sendFile(path.join(__dirname + '/test.json'));
})

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');