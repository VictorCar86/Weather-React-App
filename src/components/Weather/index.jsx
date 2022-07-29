import React from "react";
import "./Weather.css";

const Weather = ({ weatherData, mainData = weatherData.data }) => {
  return (
    <section className="weather-container">
      <span className="weather-container__cityname">{weatherData.city}</span>
      <div className="weather-container__info-container">
        <div>
          <img
            className="weather-image"
            src={require(`../../assets/icons/${mainData.weather[0].icon}.png`)}
            alt="Weather image"
          />
          <p className="weather-description">
            {mainData.weather[0].description}
          </p>
        </div>
        <div>
          <span className="weather-degrees">
            {Math.round(mainData.main.temp)}°
          </span>
          <p className="weather-feels-like">Feels like {Math.round(mainData.main.feels_like)}°</p>
        </div>
        <div className="weather-extra-info">
            <div>
                <span>Wind: </span>
                <span> <b> {mainData.wind.speed}km/h </b> </span>
            </div>
            <div>
                <span>Humidity: </span>
                <span> <b> {mainData.main.humidity}% </b> </span>
            </div>
            <div>
                <span>Pressure: </span>
                <span> <b> {mainData.main.pressure}hPa </b> </span>
            </div>
        </div>
      </div>
    </section>
  );
};

// https://brands.home-assistant.io/_/weather/logo.png

export default Weather;
