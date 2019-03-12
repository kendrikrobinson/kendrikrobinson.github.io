
/* *************************************
*  Weather Site JavaScript Functions
************************************* */


// DOM structures from webpage
"use strict"
let pageNav = document.getElementById('page-nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('page-content');

let weatherURL = "/weather/js/weather.json";
fetchData(weatherURL);
function fetchData(weatherURL){
    let cityName = 'Greenville'; // The data we want from the weather.json file
    fetch(weatherURL)
    .then(function(response) {
        if(response.ok){
            return response.json();
        }
        throw new ERROR('Network response was not OK.');
    })
    .then(function(data){
        // Check the data object that was retrieved
        console.log(data);
        // data is the full JavaScript object, but we only want the greenville part
        // shorten the variable and focus only on the data we want to reduce typing
        let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the temperature data
    let curTemp = g.Temp;
    let high = g.High;
    let low = g.Low;
    // See if it worked 
    console.log("Temp info is: " + curTemp + " " + high + " " + low);

    // Get the wind data 
    let windSpeed = g.Wind;
    let gusts = g.Gusts;
    let windDirection = g.Direction;
    // Test
    console.log("Wind is " + wind + ", Direction is " + direction + ", Gusts are " + gusts);

    // Get the current conditions
    let precipitation = g.Precip;
    let weather = g.Summary;
    // Test
    console.log("It is currently " + weather + " and the precipitation is " + precipitation);

    // Get the hourly data 
    let hourly = g.Hourly;
    // Test
    console.log("The hourly data is " + hourly);

    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('page-title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('locName');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"
    // Set the temperature information
    document.getElementById("current").innerHTML = curTemp;
    document.getElementById("high").innerHTML = "High: " + high;
    document.getElementById("low").innerHTML = "Low:" + low;

    // Set the wind information
    document.getElementById("mph").innerHTML = windSpeed + " mph";
    document.getElementById("gusts").innerHTML = gusts + " mph";
    document.getElementById("direction").innerHTML = windDirection;

    // Set the current conditions information
    document.getElementById("weatherType").innerHTML = weather;
    console.log(weather);

    // Set the hourly temperature information
    var ul = document.getElementById("hourly");
    var items = ul.getElementsByTagName("li");
    console.log(items);
    for (var i = 0; i < items.length; ++i){
        items[i].innerHTML = hourly[i];
    }

    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML ='Sorry, the data could not be processed.';
})
}

