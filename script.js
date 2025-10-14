function main() {
    //const geo = navigator.geolocation
    //const a = geo.getCurrentPosition(success, error)

    searchBarre()
    
}


function success(position) {
    //console.log(position)
    let latitude = position.coords.latitude;
    //console.log(latitude)
    let longitude = position.coords.longitude;
    //console.log(longitude)


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
settitle(cityName)



}
async function getweather(position_obj) {

   // console.log("entro en weather")
   
    const lat = position_obj["latitude"]
    const long = position_obj["longitude"]
        getCity({
     latitude: lat,
  longitude: long
})
 
    

    try {

        const clima = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&current=temperature_2m&timezone=auto`)

        const clima_obj = await clima.json()

        console.log(clima_obj)

        const temperature = clima_obj.current.temperature_2m;
        console.log(temperature);
        setTemperature(temperature)




    } catch (error) {
        console.log("no tengo el clima")
    }




}

async function searchBarre() {

    const searchItem = document.querySelector(".searchItem")

    //console.log(searchItem)

    searchItem.addEventListener("submit", function search(event_obj) {

        event_obj.preventDefault()

        const formData_obj = new FormData(searchItem)
        //console.log(formData_obj);
        const city = formData_obj.get("city")
        //console.log(city)
        //const latitude = formData_obj.get("latitude")
        //console.log(latitude)
        //const longitude = formData_obj.get("longitude")
        //console.log(longitude)

        //const longitudeValue = longitude.trim()
        //const latitudValue = latitude.trim();
        //const decimalRegex = /^-?\d*\.?\d+$/;

        if (city.trim() == "") {

            /*if (decimalRegex.test(latitudValue)&&decimalRegex.test(longitudeValue)) {
                
                console.log('Número decimal válido:', latitudValue, longitudeValue);
            } else {
                
                console.log("no sirve")
            }*/
        } else {

            console.log("pasa bien")
            setCoordenade(city.trim())


        }


    })

}

async function setCoordenade(city) {

    try {
        const elementCity = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1&language=en&format=json")
        const coorde_obj = await elementCity.json()

        //console.log(coorde_obj)
        // console.log(coorde_obj["results"])
        //console.log(coorde_obj["results"][0]["latitude"])
        //console.log(coorde_obj["results"][0]["longitude"])
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

function settitle(city) {

    const titleElement = document.querySelector(".data-front")
    //titleElement.textContent = ""
    const title = document.createElement("h1")
    title.textContent = city
    titleElement.appendChild(title)
}

function setImgMeteo() {

}

function setTemperature(temperature) {
    

    const titleElement = document.querySelector(".data-front")
    const temper = document.createElement("p")
    temper.textContent = temperature + "°"
    titleElement.appendChild(temper)
}





//https://api.open-meteo.com/v1/forecast?latitude=43.6043&longitude=1.4437&hourly=temperature_2m
//"https://api.open-meteo.com/v1/forecast" + latitude&longitude + "&hourly=temperature_2m"*/
//https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json
main();