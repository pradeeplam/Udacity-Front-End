/* Global Variables */
const button = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

const localAddress = 'http://localhost:5502'
const zip2coordURL = 'http://api.openweathermap.org/geo/1.0/zip?';
const coord2weatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '1aafe2c60b0234d552d24f2a21835624&units=imperial';

/* Helper Functions */

// Format (country, zip) => (lat, lon)
// http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
const getCoord = async (zipCode, countryCode, key) => {
    const res = await fetch(`${zip2coordURL}zip=${zipCode},${countryCode}&appid=${key}`);
    try{
        const data = await res.json();
        return data;
    } catch(error){
        console.log('Error encountered fetching coords from zip: ', error);
    }
}

// Format (lat, lon) => (weather)
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const getWeather = async (lat, lon, key) => {
    const res = await fetch(`${coord2weatherURL}lat=${lat}&lon=${lon}&appid=${key}`);
    try{
        const data = await res.json();
        return data;
    } catch(error){
        console.log('Error encountered fetching weather: ', error);
    }
}

// POST data to server
const postData = async (url='', data={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    try{
        const latestData = await response.json();
        return latestData
    } catch(error) {
        console.log('Error encountered posting data: ', error);
    }
}

// Update UI based on asking backend
const updateUI = async () => {
    const request = await fetch(localAddress+'/grabData');

    try{
        const allData = await request.json();  // Parsed into json format
        console.log('From server in updateUI: ', JSON.stringify(allData));

        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
        document.getElementById('content').innerHTML = allData.content;

    } catch(error){
        console.log('Error fetching from server in updateUI: ', error);
    }
}

/* Main JS code */
function performAction(evt){
    const zipCode =  zip.value;
    getCoord(zipCode, 'US', apiKey).then((data) => {
        console.log('From getCoord: ', JSON.stringify(data));
        return getWeather(data.lat, data.lon, apiKey);
    }).then((data) => {
        console.log('From getWeather: ', JSON.stringify(data));
        
        // Update data to be sent to server
        const update = {}
        update.temp = data.main.temp;
        update.date =  newDate;
        update.content = feelings.value;

        console.log('Posting to postData: ', JSON.stringify(update));
        
        postData(url=localAddress + '/addData', data=update);
    }).then(() => {
        updateUI();
    });
}

button.addEventListener('click', performAction);