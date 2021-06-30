/* Global Variables */
//Api key for openwaether map
const apiKey = "&appid=f8ae02d4b84e215e99bf8ad3f07b07a9";
//base url for open weather map
const apiURL = 'http://api.openweathermap.org/data/2.5/weather?';

//had these in wrong order
let date = new Date();
let newDate = date.getDate()+'.'+ date.getMonth()+'.'+ date.getFullYear();

//when generate button is clicked, run generateWeather function
document.getElementById('generate').addEventListener('click', generateWeather);

function generateWeather(e){
    // Get input data to include in the POST
    //can't use let, need to use const (not for going forward)
    const postCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    //Get weather data for designated postcode
    retrieveWeather(apiURL, apiKey, postCode)
    .then(function(data){
      console.log(data);
    // Add all data into POST request
        postData('/all', {temp:data.main.temp, date:newDate, feeling:feelings});
        //run userView function
    })
      .then( () => userView());
    }

//get data from weather API
const retrieveWeather = async (apiURL, zip, apiKey)=>{
          const request = await fetch(apiURL + zip + apiKey) // await until all data is received from API call, then try
          try {
            const data = await response.json(); // Return data as JSON
            return data;
          }
          //catch any potential errors that arise and output results in console
          catch(error) {
            console.log("error", error);
          }
        }

//Displaying final outcome of data
const postData = async ( apiURL = '', data = {})=>{
      const response = await fetch(apiURL, {
      //post data
      method: 'POST',
      //set credentials
      credentials: 'same-origin',
      headers: {
        //define content type as JSON
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header
      body: JSON.stringify(data),
    });
    //console.log(response);
      try {
        const newData = await response.json();
        return newData;
      }
      //catch any potential errors that arise and output results in console
      catch(error) {
      console.log("error", error);
      }
  }

//post data
const userView = async()=>{
      const entries = await fetch('/all');
          //try
          try{
              const projectData = await entries.json();
              //output user results onto web-page
              document.querySelector('date').innerHTML = "The date today is: " + projectData.date;
              document.querySelector('temp').innerHTML = "The temperature is currently: " + projectData.temp;
              document.querySelector('content').innerHTML = "The weather is making me feel:" + projectData.feelings;
            }
          //catch any potential errors that arise and output results in console
          catch(err){
             console.log('Error posting data ' + err);
      }}
