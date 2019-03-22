/************************************
 * Weather Site Javascript Functions
 ************************************/

console.log('My javascript is being read');
// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
        "User-Agent": "Student Learning Project - rob18012@byui.edu"
    }
};

// Setup localStorage
var storage = window.localStorage;

// Variables for Function use
const temp = 31;
const speed = 5;
buildWC(speed, temp);

// Wind dial call function
const direction = "sw"; //set your own value
windDial(direction);

// Meters function
let meters = 1400;

console.log("Meters: " + meters);
let feet = convertMeters(meters);
console.log("Feet: " + feet);
setElevation(feet);

//Current conditions function
// condition = getCondition("Clear");
// changeSummaryImage(condition);

//  This is to calculate the wind chill
function buildWC(speed, temp) {

    // const feelTemp = document.getElementById("feelTemp")

    // Compute wind chill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp) ? temp : wc;

    // Display the wind chill
    console.log(wc);

    // wc = 'Feels like '+wc+'&deg;F';
    feelTemp.innerHTML = wc;

}



// Wind dial function
function windDial(direction) {


    // Get wind dial container
    const dial = document.getElementById("dial");
    console.log(direction);

    // make sure string is all uppercase
    direction = direction.toUpperCase();


    // Determine the dial class
    switch (direction) {
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule selector
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "s");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "e");
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "w");
            break;
    }
}









// Convert meters
//this function will take meters and convert it to feet
function convertMeters(meters) {
    let feet = meters * 3.2804;
    feet = Math.round(feet);
    return feet;
}

// The number that we are going to get from the function with change the elevation
// on the page to feet.
function setElevation(feet) {
    document.getElementById('elevation').innerHTML = feet;
}


//Function that will change the image based on current conditions
    function getCondition(statement) {
        statement = statement.toLowerCase();
        console.log("statement passed to getCondition() is: " + statement);
        let condition = "";


        if (statement == 'cloudy' ||
            statement == 'cloud' ||
            statement == 'overcast' ||
            statement == 'clouds') {
            condition = 'clouds';
            return condition;
        } else if (statement == 'snow' ||
            statement == 'snowing' ||
            statement == 'flurries') {
            condition = 'snow';
            return condition;
        } else if (statement == 'fog' ||
            statement == 'foggy' ||
            statement == 'low visibility') {
            condition = 'fog';
            return condition;

        } else if (statement == 'raining' ||
            statement == 'pouring' ||
            statement == 'precipitation' ||
            statement == 'wet' ||
            statement == 'rain' ||
            statement == 'rainy' ||
            statement == 'thunderstorms') {
            condition = 'rain'
            return condition;
        } else {
            condition = 'clear';
            return condition;
        }
    }

    
//change the summary image function
function changeSummaryImage(condition) {
    document.getElementById('rain').setAttribute("class", condition);
    document.getElementById('box').setAttribute("class", condition);
    document.getElementById('weatherType').innerHTML = condition;
    return 0;

}



// Convert to 12 hour hourly temp
function format_time(hour) {
    if (hour > 23) {
        hour -= 24;
    }
    let amPM = (hour > 11) ? "pm" : "am";
    if (hour > 12) {
        hour -= 12;
    }
    if (hour == 0) {
        hour = "12";
    }
    return hour + amPM;
}



// Build the hourly temp list
function buildHourlyData(nextHour, hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + format_time(nextHour) + ':' + hourlyTemps[0] + '&deg;F</li>';
    // Build the rest in a loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
        hourlyListItems += '<li>' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
    }
    console.log('HourlyList is: ' + hourlyListItems);
    return hourlyListItems;
}

// Get next hour based on time
let date = new Date();
let nextHour = date.getHours() + 1;






// ************************************** //
// FUNCTIONS FROM THE SANDBOX TEST FILES //

// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale;
    // NWS User-Agent header is second parameter

    // Fetch fucntion
    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Response not OK.");
        })
        .then(function (data) {
            // Check 
            console.log("Json object from getLocation function: ");
            console.log(data);
            // Store in localstorage
            storage.setItem("locName", data.properties.relativeLocation.properties.city);
            storage.setItem("locState", data.properties.relativeLocation.properties.state);

            // Get link to hourly data
            let hourlyLink = data.properties.forecastHourly;
            console.log('look at me');
            console.log(hourlyLink);
            getHourly(hourlyLink);

            // ForecastURL
            let forecastURL = data.properties.forecast;
            getForecast(forecastURL);

            // Get link to weather station ID
            let stationsURL = data.properties.observationStations;
            // Call getStationId function
            getStationID(stationsURL);
        })
        .catch(error => console.log("There was a getLocation error: ", error))
}

// Gets weather station list and finds ID
function getStationID(stationsURL) {
    fetch(stationsURL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Response not OK.");
        })
        .then(function (data) {
            // Check collected data
            console.log("From getStationId function:");
            console.log(data);


            // Store station ID and elevation
            let stationId = data.features[0].properties.stationIdentifier;
            let stationElevation = data.features[0].properties.elevation.value;
            // Check
            console.log("Station and Elevation are " + stationId, stationElevation);

            // Data to localstorage
            storage.setItem("stationId", stationId);
            storage.setItem("stationElevation", stationElevation);

            // Request current weather for specific station
            getWeather(stationId);
        })
        .catch(error => console.log("There was a getStationId error: ", error))
}





// Gets current weather information for specific station
function getWeather(stationId) {
    // Url for current observation data
    const URL = "https://api.weather.gov/stations/" + stationId + "/observations/latest";

    fetch(URL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR("Response not OK.");
        })
        .then(function (data) {
            // Check data
            console.log("From getWeather function:");
            console.log(data);

            // Store weather information 
            let temperature = data.properties.temperature.value;
            let curWeather = data.properties.textDescription;
            let windGust = data.properties.windGust.value;




            // Local storage
            storage.setItem("temperature", temperature);
            storage.setItem("curWeather", curWeather);
            storage.setItem("windGust", windGust);
        })
        .catch(error => console.log("There was a getWeather error: ", error))
}

function getHourly(hourlyLink) {
    fetch(hourlyLink)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Response not OK.");
        })
        .then(function (data) {
            // Check 
            console.log("Json object from getHourly function: ");
            console.log(data);

            // Store Hourly Information
            let hourly = [];

            for (let i = 0; i < 13; i++) {
                hourly[i] = data.properties.periods[i].temperature;
            }

            // Get  Info
            let windDirection = data.properties.periods[0].windDirection;
            let windSpeed = data.properties.periods[0].windSpeed;
            let temperature = data.properties.periods[0].temperature;



            // Local Storage
            storage.setItem("hourly", hourly);
            storage.setItem("windDirection", windDirection);
            storage.setItem("windSpeed", windSpeed);
            storage.setItem("temperature", temperature);
        })
        .catch(error => console.log("There was a getHourly error: ", error))
}
// End getHourly Function

// getForcast function
function getForecast(forecastURL) {
    fetch(forecastURL, idHeader)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Response not OK.");
        })
        .then(function (data) {
            // Check 
            console.log("Object from getForecast function: ");
            console.log(data);

            // Store Forecast information
            let high = data.properties.periods[0].temperature;
            let low = data.properties.periods[1].temperature;
            let icon = data.properties.periods[0].icon;
            let detailedForecast = data.properties.periods[0].detailedForecast;

            // Local storage
            storage.setItem("high", high);
            storage.setItem("low", low);
            storage.setItem("icon", icon);
            storage.setItem("detailedForecast", detailedForecast);
        })
        .catch(error => console.log("There was a getForecast error: ", error))
}
buildPage();

function buildPage() {
    // Set Head
    let pageTitle = document.getElementById('page-title');
    // Combine state and city
    let fullName = storage.getItem("locName") + ", " + storage.getItem("locState");
    let fullNameNode = document.createTextNode(fullName);
    // Change title and h1
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    document.getElementById('locName').innerHTML = fullName;
    // Wind Dial
    let gust = storage.getItem("windGust") + ' mph';
    document.getElementById('gusts').innerHTML= gust;
    let windS = storage.getItem('windSpeed');
    document.getElementById('windSpeed').innerHTML = windS;
    let windD = storage.getItem("windDirection");
    document.getElementById("direction").innerHTML = windD;
    windDial(windD);


    // // Weather condition
    // let curW= storage.getItem('curWeather');
    // let cond = getCondition(curW);
    // console.log('Curent Weather Condidtion is:');
    // console.log(getCondition(curW));
    // changeSummaryImage(cond);

     // SET WEATHER INFORMATION
     let curWeather = storage.getItem("curWeather");
     // Set summary title
     document.getElementById("weatherType").innerHTML = curWeather;
     // Set summary image
     let summary = getCondition(curWeather);
     changeSummaryImage(summary);
     // Test
     console.log("Weather description is: " + curWeather);






    // Temps
    let temp = storage.getItem('temperature');
    tempR =Math.round((convertToFahrenheit(temp))); 
    document.getElementById('current').innerHTML= tempR + '&#176;' +'F';

    let low = storage.getItem('low');
    document.getElementById('low').innerHTML = low+ '&#176;' +'F';

    let high = storage.getItem('high');
    document.getElementById('high').innerHTML = high+ '&#176;' +'F';
    // Meters to feet Set
    let eleva = storage.getItem('stationElevation');
    convertMeters(eleva);
    console.log('Converted Elevation is:')
    console.log(convertMeters(eleva));
    document.getElementById('elevation').innerHTML = convertMeters(eleva)+ ' ft.';
    //Hourly temps
    let date = new Date();
    let nextHour = date.getHours() + 1;
    let hourlyData = storage.getItem('hourly');
    hourlyUL.innerHTML = (nextHour, hourlyData);
    console.log(hourlyUL.innerHTML = (nextHour, hourlyData));

    // Detailed Forecast
            let df = storage.getItem("detailedForecast");
            document.getElementById('cast').innerHTML= df


// Wind Information
    //WindCHill
    let speed = storage.getItem('windSpeed');
   // ALready done above----- let temp = storage.getItem('temperature');
   let ws = speed.charAt(0);
    document.getElementById("feelTemp").innerHTML = buildWC(ws, tempR);

    

    

    //Latitude and Long
    let lat = storage.getItem('latitude');
    let long = storage.getItem('longitude');
    //sets up values for the directions
    let latC ='';
    let longC= '';
    //rounds the lat and long
    lat =Math.round(lat*100)/100;
    long =Math.round(long*100)/100;

    // getting N or s/ e or w
    //         if(Math.sign(lat) == 1){
    //             latC = "&deg;N, "
    //         }
    //         else{latC = '&deg;S '}
    //         if(Math.sign(long) == 1){
    //             longC = '&deg;E '
    //         }
    //         else{ longC = '&deg;W '}

    //         document.getElementById('logitude').innerHTML = lat +latC+', ' +long +longC;
            


// Celsius to Fahrenheit conversion
let test = convertToFahrenheit(0);
console.log('Fahrenheit converted is: ');
console.log(test);

// Convert to Fahrenheit
function convertToFahrenheit(temperature) {
    let c = temperature;
    let f = (c * (9 / 5) + 32);
    return f;
}
pageContent.setAttribute('class', ''); 
statusMessage.setAttribute('class', 'hide'); 
}