function main(){
    //const geo = navigator.geolocation
    //const a = geo.getCurrentPosition(success, error)
    searchBarre()
    

    
}
main();


function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getweather(latitude,longitude);

}
    
function error() {
    console.log("Unable to retrieve your location") 
}

async function getweather(latitude, longitude){

    const clima = await fetch("https://api.open-meteo.com/v1/forecast?" + latitude + "&" + longitude + "&hourly=temperature_2m")

    const clima_obj = await clima.json()

    console.log(clima_obj)

    

}

function searchBarre() {
    
    const searchItem = document.querySelector(".searchItem")

    console.log(searchItem)
    
    searchItem.addEventListener("submit", function search(event_obj) {
        
        event_obj.preventDefault()
        
        const formData_obj = new FormData(searchItem)
        console.log(formData_obj);
        const city = formData_obj.get("city")
        console.log(city)
        const latitude = formData_obj.get("latitude")
        console.log(latitude)
        const longitude = formData_obj.get("longitude")
        console.log(longitude)

        const longitudeValue = longitude.trim()
        const latitudValue = latitude.trim();
        const decimalRegex = /^-?\d*\.?\d+$/;
            
            if (decimalRegex.test(latitudValue)&&decimalRegex.test(longitudeValue)) {

                console.log('Número decimal válido:', latitudValue, longitudeValue);
            } else {
            
                console.log("no sirve")
            }


})

}

async function setCoordenade(city){
    
    try{
    const elementCity = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1&language=en&format=json")
    const coorde_obj = await elementCity.json()

    console.log(coorde_obj)
    console.log(coorde_obj["results"])
    console.log(coorde_obj["results"][0]["latitude"])
    console.log(coorde_obj["results"][0]["longitude"])
    const latitud = coorde_obj["results"][0]["latitude"]
    const longitud = coorde_obj["results"][0]["longitude"]
    return latitud, longitud
    }catch(error){

        console.log("error de busqueda")
    }
}


//https://api.open-meteo.com/v1/forecast?latitude=43.6043&longitude=1.4437&hourly=temperature_2m
//"https://api.open-meteo.com/v1/forecast" + latitude&longitude + "&hourly=temperature_2m"*/
//https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json