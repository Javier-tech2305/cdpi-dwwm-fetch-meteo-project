function main() {
    onPosition()
    searchBarre()

}

function onPosition() {
    const geo = navigator.geolocation
    const a = geo.getCurrentPosition(success, error)
}

function success(position) {

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getweather({
        latitude: latitude,
        longitude: longitude
    });
}

function error() {
    console.log("Unable to retrieve your location")
}

async function getCity(position_obj) {

    const lat = position_obj["latitude"]
    const long = position_obj["longitude"]
    const coord = await fetch(` https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json&accept-language=fr;`)
    const city = await coord.json()
    const cityName = city.address.city
    const countryName = city.address.country
    settitle(cityName, countryName)

}

async function getweather(position_obj) {

    const lat = position_obj["latitude"]
    const long = position_obj["longitude"]
    getCity({
        latitude: lat,
        longitude: long
    })

    try {

        const clima = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=is_day,temperature_2m,weather_code&timezone=auto`)
        const clima_obj = await clima.json()
        const temperature = clima_obj.current.temperature_2m;

        setTemperature(temperature)
        setImgMeteo(clima_obj.current.weather_code, clima_obj.current.is_day)

    } catch (error) {
        console.error("no tengo el clima")
    }

}

async function searchBarre() {

    const searchItem = document.querySelector(".searchItem")

    searchItem.addEventListener("submit", function search(event_obj) {

        event_obj.preventDefault()

        const formData_obj = new FormData(searchItem)
        const city = formData_obj.get("city")
        setCoordenade(city.trim())


    })

}

async function setCoordenade(city) {

    try {
        const elementCity = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1&language=en&format=json")
        const coorde_obj = await elementCity.json()
        const latitud = coorde_obj["results"][0]["latitude"]
        const longitud = coorde_obj["results"][0]["longitude"]
        settitle(city)
        getweather({
            latitude: latitud,
            longitude: longitud
        })
    } catch (error) {

        console.log("error de busqueda")
    }
}

function settitle(city, country) {

    const titleElement = document.querySelector(".city-title").textContent = city
    const subTitleElement = document.querySelector(".country-title").textContent = country
}

function setImgMeteo(weather_code, is_day) {
  
    document.body.classList.remove("rainy", "snow", "storn", "clear-night", "cloudy-night", "cloudy-sky", "fog","night");

    if(is_day == 1){

        if (weather_code >= 0 && weather_code <= 3) {
           document.body.classList.add("cloudy-sky");
        }
       
        else if (weather_code >= 45 && weather_code <= 48) {
            document.body.classList.add("fog");
        }
       
        else if ((weather_code >= 51 && weather_code <= 67) || (weather_code >= 80 && weather_code <= 82)) {
           document.body.classList.add("rainy");
        }
       
        else if ((weather_code >= 71 && weather_code <= 77) || (weather_code >= 85 && weather_code <= 86)) {
            document.body.classList.add("snow");
        }
       
        else if (weather_code >= 95) {
           document.body.classList.add("storn");
        }
        
        else {
            document.body.classList.add("cloudy-sky");
        }
    }else{
        document.body.classList.add("night");
    }

}


function setTemperature(temperature) {

    const titleElement = document.querySelector(".temperature").textContent = temperature + "°C"

}

main();
