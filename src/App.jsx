import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./App.css"
import Search from './components/Search'
import Weather from './components/Weather'
import { WEATHER_KEY, WEATHER_URL } from './infoApi'
import Forecast from './components/Forecast'
import MapPicker from './components/MapPicker'

const App = () => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  console.log(weather, forecast)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ")

    const currentWeatherFetch = axios(`${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`)
    const forecastFetch = axios(`${WEATHER_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(response => {
        const weatherResponse = response[0]
        const forecastResponse = response[1]

        if (searchData.label === undefined){
          searchData.label = `${weatherResponse.data.name} ${weatherResponse.data.sys.country}`
        }

        setWeather({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forecastResponse })

      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    let coordinates = "";
    navigator.geolocation.getCurrentPosition(data => {
      coordinates = {
        label: undefined,
        value: `${data.coords.latitude} ${data.coords.longitude}`
      }
      handleOnSearchChange(coordinates)
    },
    console.log("Petition Rejected"))
  }, [])

  return (
    <>
      <nav>
          <Search
              onSearchChange={handleOnSearchChange}
          />
      </nav>
      <main className='main'>
        {weather &&
          <Weather weatherData={weather}/>
        }
        {weather &&
          <MapPicker onSearchChange={handleOnSearchChange} weather={weather}/>
        }
        {forecast &&
          <Forecast forecastData={forecast}/>
        }
      </main>
      <footer className='footer'>
        <span>VictorCar86</span>
        <a href='https://github.com/VictorCar86' target="_blank" >
          <img src={require("./assets/icons/github.png")} />
          <span>GitHub</span>
        </a>
        <a href='https://twitter.com/victorcar86_' target="_blank" >
          <img src={require("./assets/icons/twitter.png")} />
          <span>Twitter</span>
        </a>
      </footer>
    </>
  )
}

export default App