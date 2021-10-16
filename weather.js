let url = "https://api.weather.gov/gridpoints/MPX/116,72/forecast"

let weatherTable = document.querySelector('#weather-forecast')

let returnFromFetch = fetch(url)
console.log(returnFromFetch)

returnFromFetch.then(response => {
    console.log(response)
    console.log(response.json())
})


fetch(url)
    .then( res => res.json() )
    .then(weatherData => {
        let periodsArray = weatherData.properties.periods

        periodsArray.forEach(period => {

            let forecastRow = document.createElement('tr')
            weatherTable.appendChild(forecastRow)

            let dayTableData = document.createElement('td')
            dayTableData.innerHTML = period.name
            forecastRow.appendChild(dayTableData)

            let temperatureTableData = document.createElement('td')
            temperatureTableData.innerHTML = period.temperature
            forecastRow.appendChild(temperatureTableData)

            let imageIconUrl = period.icon
            let forecastIcon = document.createElement('img')
            forecastIcon.src = imageIconUrl
            let iconTableData = document.createElement('td')
            iconTableData.appendChild(forecastIcon)
            forecastRow.appendChild(iconTableData)

            let detailedTableData = document.createElement('td')
            detailedTableData.innerHTML = period.detailedForecast
            forecastRow.appendChild(detailedTableData)


        })

    })
