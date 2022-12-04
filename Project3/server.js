
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5502;
const server = app.listen(port, listening);
function listening(){
    console.log(`Running on localhost: ${port}`);
}

app.get('/grabData', function sendData(req, res){
    console.log('Sent data to client: ' + JSON.stringify(projectData));
    res.send(projectData);
});

app.post('/addData', function receiveData(req, res){
    console.log('Sent data to client: ' + JSON.stringify(req.body));  
    projectData["temp"] = req.body.temp;
    projectData["date"] = req.body.date;
    projectData["content"] = req.body.content;
});