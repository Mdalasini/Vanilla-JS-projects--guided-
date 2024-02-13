window.addEventListener('load', ()=> {
    let long;
    let lat;
    const apiKey = '9d60dd3ef5d94127db8b83f861bab0cc' 
    let temperatureDescription = document.getElementById('temperature-description');
    let temperatureValue = document.getElementById('temperature-value');
    let locationTimezone = document.getElementById('location-timezone');
    let imageElement = document.getElementById('icon')
    let degreeSection = document.getElementById('degree-section')
    let temperatureUnit = document.getElementById('temperature-unit')

    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude
            lat = position.coords.latitude

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

            fetch(url)
                .then(response => {
                    return response.json();
                })
                .then(data =>{
                    const description = data.weather[0].description
                    const temperature = data.main.temp
                    const country = data.sys.country
                    const name = data.name
                    const icon = data.weather[0].icon
                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`

                    function capitalizeWords(inputString) {
                        return inputString.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    }

                    // Set DOM elements from API
                    temperatureValue.textContent = temperature;
                    temperatureDescription.textContent = capitalizeWords(description);
                    locationTimezone.textContent = `${name}/${country}`
                    imageElement.src = iconUrl
                    console.log(description)

                    // Initial states
                    var isCelcius = false
                    var currentTemp = temperatureValue.textContent
                    var tempUnit = ''

                    degreeSection,addEventListener('click', function () {
                        if(isCelcius) {
                            // change to Kelvin
                            currentTemp += 273.15
                            tempUnit = '°K'
                        } else {
                            // change to Celcius
                            currentTemp -= 273.15
                            tempUnit = '°C'
                        }

                        // Update content
                        temperatureValue.textContent = currentTemp.toFixed(2)
                        temperatureUnit.textContent = tempUnit

                        // Toggle the state
                        isCelcius = !isCelcius
                    })
                })
        })
    }else{
        alert('Site needs geolocation');
    }
});