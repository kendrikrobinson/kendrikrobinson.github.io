/************************************
 * Weather Site Javascript Functions
 ************************************/

console.log('My javascript is being read');

// Variables for Function use
const temp = 31;
const speed = 5;
buildWC(speed, temp);

// Wind dial call function
const direction = "ne"; //set your own value
windDial(direction);

// Meters function
let meters = 1400;

console.log("Meters: " + meters);
let feet = convertMeters(meters);
console.log("Feet: " + feet);
setElevation(feet);

//Current conditions function
const condition = getCondition('raining');
changeSummaryImage(condition);

//  This is to calculate the wind chill
function buildWC(speed, temp) {

    const feelTemp = document.getElementById("feelTemp")

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
        statement == 'overcast' ||
        statement == 'gloomy') {
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
        statement == 'wet') {
        condition = 'rain'
        return condition;
    } else{
        condition = 'clear';
        return condition;
    }
}
    //change the summary image function
    function changeSummaryImage(condition){
        document.getElementById('rain').setAttribute("class", condition);
        return 0;
    }