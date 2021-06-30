// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Cors for cross origin allowance
const cors = require('cors');

/* Middleware*/
// Initialize the main project folder
app.use(express.static('website'));

//global variable for bodyParser
const bodyParser = require('body-parser');
//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));

//Configuring express to use cors.
app.use(cors());
app.use(bodyParser.json());

// Setup Server
//port number can be changed dependent on individual user's available ports
const port = 8000;
//set varibale for server
const server = app.listen(port, listening);

function listening(){
    //log text in console for evidence that servers are working
    console.log ("server is running");
    console.log (`running on localhost: ${port}`);
}

//testing get requests
// respond with "hello world" when a GET request is made to the homepage
//app.get('/', function (req, res) {
  //res.send('hello world');
//})
app.get('/all', getData);

function getData (request, response){
    response.send(projectData);
    console.log(projectData);
};

app.post('/add', postData);

//post all
function postData (request, response) {

    let data = request.body;

    console.log('POST Update to server ', data);

    projectData['temp'] = data.temp;
    projectData['date'] = data.date;
    projectData['feelings'] = data.feelings;

    //send project data
    response.send(projectData);
};
