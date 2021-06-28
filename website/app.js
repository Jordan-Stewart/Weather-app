/* Global Variables */
//Api key for openwaether map
const apiKey = "f8ae02d4b84e215e99bf8ad3f07b07a9";
//base url for open weather map
const apiURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
//converticing to appropriate metric system
const units = '&units=metric';

// Create a new date instance dynamically with JS
let date = new Date();
let newDate = date.getDate()+'.'+ date.getMonth()+'.'+ date.getFullYear();

//when generate button is clicked, run generateWeather function
document.getElementById('generate').addEventListener('click', generateWeather);

function generateWeather(e){
    // Get input data from form data to include in the POST
    const feeling = document.getElementById('feelings').value;
    const postCode = document.getElementById('zip').value;
    console.log('Users postcode is '+ postCode)

    //Get weather data for designated postcode
    newInput(apiURL,postCode,apiKey,units)

    .then(function(data){
      console.log(data);
    // Add all data into POST request
        postData('/all', {temp:data.main.temp, dttm:newDate, zip:postCode, feeling:feeling});
    }) .then( () =>{
        postUpdates()
     })
    };

//GET data from WEB API using ASYNC
    const newInput = async (apiURL, zip, apiKey, units)=>{
      console.log('New Input', {apiURL, zip, apiKey, units})
      const response = await fetch(apiURL+zip+apiKey+units) // await until all data is received from API call, then try
      try { // If fetch goes well
        const data = await response.json(); // Return data as JSON
        return data;
      }  catch(error) { //If fetch goes wrong then error.
        console.log("error", error);
        // appropriately handle the error
      }
    }

//POST DATA function
const postData = async ( apiURL = '', data = {})=>{
      const response = await fetch(apiURL, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });
    //console.log(response);
      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

  //CODE TO UPDATE UI
  const postUpdates = async()=>{
        const entries = await fetch('/all');
        try{
            const projectData = await entries.json();
            document.getElementById('date').innerHTML = `The date today is: ${projectData.dttm}`;
            document.getElementById('temp').innerHTML = `The temperature is currently: ${projectData.temp}c in ${projectData.zip}`;
            document.getElementById('content').innerHTML = `The weather is making me feel: ${projectData.feeling}`;
        }
        //catch any potential error that may be thrown
        catch(err){
            console.log('Error posting data ' + err);
        }}
