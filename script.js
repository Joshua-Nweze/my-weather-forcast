window.addEventListener('load', () => {

let long;
let lat;

if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            const location = document.querySelector('#location');
            const temperature = document.querySelector('#temp');
            const windSpeed = document.querySelector('#windSpeed');
            const mainDesc =  document.querySelector('#main-desc');
            const temperatureSearch = document.querySelector('.tempSearch');
            const tempIcon = document.querySelector('#tempIcon');

            long = position.coords.longitude;
            lat = position.coords.latitude;

            // console.log(long, lat);

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api_key}`;
            
            fetch(api)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const temp = data.main.temp + "°C";
                    const tempFarenhiet = (data.main.temp * 1.8 + 32).toFixed(2) + "°F";
                    const {name} = data;
                    const {speed} = data.wind;
                    const {id, main} = data.weather[0];
                    // console.log(id)

                    //Add the info in the DOM
                    location.innerHTML = name;
                    temperature.innerHTML = temp;
                    windSpeed.innerHTML = speed + " Km/s";
                    mainDesc.innerHTML = main;

                    //Change to Celcius and farenheit
                    temperature.addEventListener('click', () => {
                        if(temperature.innerHTML == temp){
                            // console.log("nice");
                            
                    temperatureSearch.innerHTML = "";
                            temperature.innerHTML = tempFarenhiet;
                        } else {
                            // console.log("nice2");

                    temperatureSearch.innerHTML = "";
                            temperature.innerHTML = temp;
                        }
                    })

                    if (id >= 200 && id < 250) {
                        //cloud-lightning-rain icon
                        tempIcon.innerHTML = "<i class=\"bi bi-cloud-lightning-rain\"></i>";
                    } else if (id >= 300 && id < 350){
                        //cloud-drizzle icon
                        tempIcon.innerHTML = "<i class=\"bi bi-cloud-drizzle\"></i>";
                    } else if (id >= 500 && id < 550 ) {
                        //cloud-rain
                        tempIcon.innerHTML = "<i class=\"bi bi-cloud-rain\"></i>";
                    } else if (id >= 600 && id < 650 ) {
                        //cloud-snow icon
                        tempIcon.innerHTML = "<i class=\"bi bi-cloud-snow\"></i>";
                    } else if (id >= 700 && id < 795 ) {
                        //cloud-haze2 icon
                        tempIcon.innerHTML = "<i class=\"bi bi-cloud-haze2\"></i>";
                    } else if (id === 800 ) {
                        //cloud-sun icon
                        tempIcon.innerHTML = "<i class=\"bi bi-cloud-sun\"></i>";
                    } else if (id >= 801 && id < 850 ) {
                        //clouds icon
                        tempIcon.innerHTML = "<i class=\"bi bi-clouds\"></i>";
                    }
                    

                })
        })
    }

    
})

//Search Bar 

let searchBtn = document.querySelector("#searchBtn"); 

searchBtn.addEventListener('click', () =>{
    let searchLocation = document.querySelector("#searchLocation").value;
    if (searchLocation == "") {
        alert("Invalid location");
        document.querySelector("#searchLocation").focus()
    } else {
         const location = document.querySelector('#location');
    const temperature = document.querySelector('#temp');
    const windSpeed = document.querySelector('#windSpeed');
    const mainDesc =  document.querySelector('#main-desc');
    const tempIcon = document.querySelector('#tempIcon');
    const temperatureSearch = document.querySelector('.tempSearch');
    //const desc =  document.querySelector('#desc');

    
    let searchBarApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&units=metric&appid=8368787296b15cf1c0f66331292a441d`;
    // console.log(searchLocation) 

    fetch(searchBarApi) 
        .then(response => {
            return response.json()
        })
        .then(data => {
            // console.log(data)
            
            const tempSearch = data.main.temp + "°C";
            const tempSearchFarenhiet = (data.main.temp * 1.8 + 32).toFixed(2) + "°F";
            const {name} = data;
            const {speed} = data.wind;
            const {id, main} = data.weather[0];
            // console.log(id)

            //Add the info in the DOM
            location.innerHTML = name;
            temperatureSearch.innerHTML = tempSearch;
            windSpeed.innerHTML = speed + " Km/s";
            mainDesc.innerHTML = main;
            temperature.innerHTML = "";

            //Change to Celcius and farenheit
            temperatureSearch.addEventListener('click', () => {
                if(temperatureSearch.innerHTML == tempSearch){
                    // console.log("niceSearch");
                    temperature.innerHTML = "";
                    temperatureSearch.innerHTML = tempSearchFarenhiet;
                 } else {
                    // console.log("niceSearch2");
                    temperature.innerHTML = "";
                    temperatureSearch.innerHTML = tempSearch;
                }
            })
                if (id >= 200 && id < 250) {
                    //cloud-lightning-rain icon
                    tempIcon.innerHTML = "<i class=\"bi bi-cloud-lightning-rain\"></i>";
                } else if (id >= 300 && id < 350){
                    //cloud-drizzle icon
                    tempIcon.innerHTML = "<i class=\"bi bi-cloud-drizzle\"></i>";
                } else if (id >= 500 && id < 550 ) {
                    //cloud-rain
                    tempIcon.innerHTML = "<i class=\"bi bi-cloud-rain\"></i>";
                } else if (id >= 600 && id < 650 ) {
                    //cloud-snow icon
                    tempIcon.innerHTML = "<i class=\"bi bi-cloud-snow\"></i>";
                } else if (id >= 700 && id < 795 ) {
                    //cloud-haze2 icon
                    tempIcon.innerHTML = "<i class=\"bi bi-cloud-haze2\"></i>";
                } else if (id === 800 ) {
                    //cloud-sun icon
                    tempIcon.innerHTML = "<i class=\"bi bi-cloud-sun\"></i>";
                } else if (id >= 801 && id < 850 ) {
                    //clouds icon
                    tempIcon.innerHTML = "<i class=\"bi bi-clouds\"></i>";
                }
        })
    }
   
})

//Time in  weather info

let time = document.querySelector('#time');

const current = new Date();

const currentTime = current.toLocaleTimeString("en-US", {
hour: "2-digit",
minute: "2-digit",
});

time.innerHTML = currentTime;

//Dark Mode

let dkMode = document.querySelector('#dkModeBtn');

let lightIcon = "<i class=\"bi bi-sun\"></i>"

let moonIcon = "<i class=\"bi bi-moon-fill\"></i>"

dkMode.innerHTML = lightIcon;
 
dkMode.addEventListener('click', () => {
    let body = document.body;
    let copyright = document.querySelector("#cpright");
    let socialDk = document.querySelector("#socialDk");

    body.classList.toggle("whiteMode");
    copyright.classList.toggle("cprightDk");
    socialDk.classList.toggle("socialDkMode");
    dkMode.classList.toggle("socialDkMode");

    if (dkMode.innerHTML === lightIcon) {
        dkMode.innerHTML = moonIcon;
        // console.log("moon");
    } else {
        // console.log("light");
        dkMode.innerHTML = lightIcon;
    }
})

// Load info

let loadInfo = document.querySelector('#loadInfo');

setTimeout(() => {
    loadInfo.innerHTML = "<div class=\"alert alert-info alert-dismissible fade show\" role=\"alert\"><i class=\"bi bi-info-circle\"><\/i> Click on the temperature to toggle between Celsius and Fahrenheit<button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"><\/button><\/div>"
    // console.log("hello");
}, 4000);

// Copyright Year

let copyrightYear = document.querySelector('#copyrightYear')

const d = new Date();
let year = d.getFullYear();

copyrightYear.innerHTML = year;
