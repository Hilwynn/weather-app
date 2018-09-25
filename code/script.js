const cityLink = document.getElementsByClassName("city-link")

const cityTabs = document.getElementsByClassName("cities")

const changeTab = () => {
  [].forEach.call(cityTabs, (tab) => { 
    tab.style.borderBottom = "1px solid rgba(255, 255, 255, .5)"
      })
  }

const changeCity = (city) => {  
  let cityName = city.target.id
  let cityTab = city.target.parentElement
  doFetch(cityName)
  changeTab()
  cityTab.style.borderBottom = "none"
}

// .forEach cannot be used directly on HTML Collections since its not an array
// Array.prototype can be truncated to a pair of brackets []
[].forEach.call(cityLink, (link) => { 
    link.addEventListener("click", changeCity)
})

// Fetch API data when changing city

const receivedWeatherData = (weatherData) => {
    
  let city = weatherData.name
  
  if (city === "Gothenburg") {
    city = "Göteborg"
  }
  if (city === "Malmoe") {
    city = "Malmö"
  }
  
  const temperature = weatherData.main.temp.toFixed(1)
  
  if (temperature < 0) {
    gradientColor = `190, 40%, 60%`
  } else if (temperature > 0 && temperature <= 10) {
    gradientColor = `190, 40%, 70%`
  } else if (temperature > 10 && temperature <= 20) {
    gradientColor = `190, 40%, 80%`
  } else if (termperature > 20 && temperature <= 25) {
    gradientColor = `10, 40%, 80%`
  } else if (temperature > 25 && temperature <= 30) {
    gradientColor = `10, 40%, 70%`
  } else if (temperature > 30) {
    gradientColor = `10, 40%, 60%`
  }
  
  document.body.style.backgroundImage = `linear-gradient(135deg, hsl(${gradientColor}), hsl(0, 0%, 100%))`
  
  const weather = weatherData.weather[0].main

  // Turn the data for sunrise and sunset into the correct time of day 
  const sunriseData = new Date(weatherData.sys.sunrise * 1000)
  const sunsetData = new Date(weatherData.sys.sunset * 1000)

  // Make sure the time is formatted correctly, i.e "06.04" and not "6.4"
  const sunrise = () => {
    let sunriseHours = sunriseData.getHours()
    let sunriseMinutes = sunriseData.getMinutes()
    if (sunriseHours < 10) {
      sunriseHours = `0${sunriseHours}`
    }
    if (sunriseMinutes < 10) {
      sunriseMinutes = `0${sunriseMinutes}`
    }
    return `${sunriseHours}.${sunriseMinutes}`
  }

  // Make sure the time is formatted correctly, i.e "06.04" and not "6.4"
  const sunset = () => {
    let sunsetHours = sunsetData.getHours()
    let sunsetMinutes = sunsetData.getMinutes()
    if (sunsetHours < 10) {
      sunsetHours = `0${sunsetHours}`
    }
    if (sunsetMinutes < 10) {
      sunsetMinutes = `0${sunsetMinutes}`
    }
    return `${sunsetHours}.${sunsetMinutes}`
  } 

  const cityNameBox = document.getElementById("city-name")
  const cityTemperatureBox = document.getElementById("city-temperature")
  const cityWeatherBox = document.getElementById("city-weather")
  const citySunriseBox = document.getElementById("city-sunrise")
  const citySunsetBox = document.getElementById("city-sunset")
  
  cityNameBox.innerHTML = `${city}`
  cityTemperatureBox.innerHTML = `${temperature}&deg;C`
  cityWeatherBox.innerHTML = `${weather}`
  citySunriseBox.innerHTML = `<i class="fas fa-angle-up"></i> ${sunrise()}`
  citySunsetBox.innerHTML =  `<i class="fas fa-angle-down"></i> ${sunset()}`
  
}

const doFetch = (fetchCityName) => {
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${fetchCityName},Sweden&units=metric&APPID=a0a451c0528dcf4cebd5c7bd578a9b46`
  fetch(apiUrl).then(response => response.json()).then(receivedWeatherData)  
}

// Inital fetch with default choice
doFetch("Stockholm")
