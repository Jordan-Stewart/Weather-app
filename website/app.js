/* Global Variables */
//Api key for openwaether map
const apiKey = "&appid=f8ae02d4b84e215e99bf8ad3f07b07a9";
//base url for open weather map
//as per mentor instructions -- https://knowledge.udacity.com/questions/629283
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?zip=2031,au&units=metric';

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
    //As per mentor instructions - "method retrieveWeather should have parameter sequence as `apiURL`, `postCode` and `apiKey`"
    retrieveWeather(apiURL, postCode, apiKey)
    .then(function(data){
      console.log(data);
    // Add all data into POST request
        //The call to method `postData` should have endpoint name as `/add` -- as per mentor instruction https://knowledge.udacity.com/questions/629283
        postData('/add', {temp:data.main.temp, date:newDate, feelings:feeling});
        //run userView function
    })
      .then( () => userView());
    }

  //validation function for zipCode as per mentor instructions -- https://knowledge.udacity.com/questions/629283
  function validateZipCode(elementValue){
    var zipCodePattern = /^(0[289][0-9]{2})|([123456789][0-9]{3})$/;
    return zipCodePattern.test(elementValue);
  }

//get data from weather API
//as per mentor instruction method retrieveWeather should have parameter sequence as `apiURL`, `postCode` and `apiKey` - https://knowledge.udacity.com/questions/629283
const retrieveWeather = async (apiURL, zip, apiKey)=>{
          const request = await fetch(apiURL + zip + apiKey) // await until all data is received from API call, then try
          try {
            // request is the variable and not the response
            const data = await request.json(); // Return data as JSON
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
              //as per mentor instructions - Since in the method `userView`, you are using `querySelector`. So, for them we have to make use of `#date` as the format for fetching HTML element -- https://knowledge.udacity.com/questions/629283
              document.querySelector('#date').innerHTML = "The date today is: " + projectData.date;
              document.querySelector('#temp').innerHTML = "The temperature is currently: " + projectData.temp;
              document.querySelector('#content').innerHTML = "The weather is making me feel:" + projectData.feelings;
            }
          //catch any potential errors that arise and output results in console
          catch(err){
             console.log('Error posting data ' + err);
      }}
