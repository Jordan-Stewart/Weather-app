//API key initialisation
//API key for geonames
const geonames_API = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
const geonames_ID = process.env.USERNAME;

//API key for pixabay
const pixabay_API = 'https://pixabay.com/api/?key=';
const pixabay_ID = process.env.API_KEY_PIXABAY;

//API key for weatherbit
const weatherbit_API ='https://api.weatherbit.io/v2.0/current?';
//const todays_forecast = 'https://api.weatherbit.io/v2.0/current?';
//const future_forecast = 'http://api.weatherbit.io/v2.0/forecast/daily?'
const weatherbit_id = process.env.API_KEY_WEATHERBIT;

//had these in wrong order
let date = new Date();

//when generate button is clicked, run generateTrip function
document.getElementById('generate').addEventListener('click', generateTrip);

//fix generateTrip function as per mentor advice -- https://knowledge.udacity.com/questions/649604
function generateTrip(e){
    //retrieve elements entered by user
    const date = document.getElementById('date').value;
    const destination = document.getElementById('destination').value;
    //const countdown = document.getElementById('countdown')
    //calculation for time remaining until trip departure
    var setDate = document.getElementById('date').value;
    //getting todays date
    var today = new Date();
    //sourced from https://tecadmin.net/get-current-date-time-javascript/
    var todaysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //the following was sourced from https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
    // To calculate the time difference of two dates
    var Difference_In_Time = setDate.getTime() - todaysDate.getTime();
    // To calculate the no. of days between two dates
    const countdown = Difference_In_Time / (1000 * 3600 * 24);
    //determine if forcast will be set for tomorrow or future set date
    //if (date <= 1) {
    //  weatherbit_API = todays_forecast;
    //} else {
    //  weatherbit_API = future_forecast;
    //}

    //call retrieveDestination function
    retrieveDestination(destination)
      //upon succesful call, call retrieveWeather function
      .then(function (data)) {
        retrieveWeather(apiURL, data.geonames[0].lat,  data.geonames[0].lng, apiKey);
        return data;
      })
      //upon succesful calls, call retrieveImage function
      .then(function(data){
        retrieveImage (pixabay_API, pixabay_ID, destination);
        return data;
      })
      //post data
      .then(function (data)) {
        postData('/', {data: data.data, destination: destination, date: date, countdown: countdown})
        return data;
      })

    //call userView function
    .then( () => userView(data.hits[0].imageURL));
}


//retrieveDestination function
const retrieveDestination = async (destination) => {
      const response = await fetch(geonames_API + destination + geonames_ID)
      try {
          const data = await response.json(); // Return data as JSON
          return data;
        }
        //catch any potential errors that arise and output results in console
        catch(error) {
          console.log("error", error);
        }
      }

//retrieveImage function
const retrieveImage = async (pixabay_API, pixabay_ID, destination) => {
      const response = await fetch(pixabay_API + pixabay_ID + '&q=' + place + '&category=places&image_type=photo')
      try {
          const data = await response.json(); // Return data as JSON
          return data;
          }
          //catch any potential errors that arise and output results in console
          catch(error) {
            console.log("error", error);
          }
        }

//retrieveImage function
const retrieveWeather = async (destination, weatherbit_API, weatherbit_id) => {
      const response = await fetch(weatherbit_API+'city='+destination+'&key='+weatherbit_id)
      try {
          const data = await response.json(); // Return data as JSON
          return data;
          }
          //catch any potential errors that arise and output results in console
          catch(error) {
            console.log("error", error);
          }
        }

//Displaying final outcome of destination data
const postData= async ( url = '', data = {})=>{
      //all of the following has been copied across from my third project
      const response = await fetch('http://localhost:8080', {
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
              //define variables
              const destination = document.getElementById('destination').value;
              const departure = document.getElementById('date').value;

              // testing displaying geo API
              const geoAPI = await retrieveDestination(destination);
                 console.log(userData.lat);
                 console.log(userData.long);
                 console.log(userData.ctry);

              userData.lat = geoAPI.lat;
              userData.long = geoAPI.long;
              userData.ctry = geoAPI.ctry;

              //call countdown function for days remaining
              //countdown (date);
            }
          //catch any potential errors that arise and output results in console
          catch(err){
             console.log('Error posting data ' + err);
      }}
