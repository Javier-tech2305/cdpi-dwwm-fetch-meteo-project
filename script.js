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

        console.table(clima_obj)

        console.log(clima_obj.current.is_day)
        console.log(clima_obj.current.weather_code)
        console.log(clima_obj.current.temperature_2m)

        const temperature = clima_obj.current.temperature_2m;

        setTemperature(temperature)
        setImgMeteo(clima_obj.current.weather_code)

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

function setImgMeteo(weather_code) {

    console.log("entro en la funcion img")

    if(!weather_code <= 48){

        console.log("entro en el 1 if")   
        if(!weather_code >= 51 || weather_code <= 57 ){
            console.log("2 if")
            if(!weather_code >=61 || weather_code <= 67){
                console.log("3 if")
                if(){}                }
                document.body.classList.remove
                document.body.classList.toggle("snow")
    

            }else{
                document.body.classList.remove
                document.body.classList.toggle("storn")
    
            }
        }else{

            document.body.classList.toggle("raini")
    
        }
    }else{

        return
    
    }


    
    

}

function setTemperature(temperature) {

    const titleElement = document.querySelector(".temperature").textContent = temperature + "°"

}

main();
