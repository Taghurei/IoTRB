var bodyParser = require('body-parser')
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var fs = require('fs');
const SerialPort = require('serialport')
const serialport = new SerialPort("/dev/ttyACM1")
serialport.write("e")

/*const Readline = SerialPort.parsers.Readline
const port = new SerialPort("/dev/ttyACM0")
const parser = new Readline()
port.pipe(parser)
parser.on('data', (data) => { fs.writeFileSync('test.json', ((data))) })*/


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

router.get('/led', function (req, res) {
    console.log("led")
    serialport.write("e")
});

router.post('/change', function (req, res) {
    console.log("postroute")
    console.log(req.body)
    fs.readFile('test.json');
    fs.writeFileSync('test.json', JSON.stringify(req.body));
    res.sendFile(path.join(__dirname + '/test.json'));
})

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

/*
const Readline = require('@serialport/parser-readline')
const serialPort= new SerialPort('/dev/ttyACM0')
const parser= serialPort.pipe(new Readline({delimiter:'\n'}));
parser.on('data', handleSerialPort);

handleSerialPort*/