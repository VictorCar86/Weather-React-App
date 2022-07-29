import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./Forecast.css"

const Forecast = ({ forecastData, data = forecastData.data }) => {
  const DAYS_ON_WEAK = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const today = new Date().getDay();

  const actualWeak = DAYS_ON_WEAK.slice(today, DAYS_ON_WEAK.length).concat(
    DAYS_ON_WEAK.slice(0, today)
  );

  return (
    <section className="forecast-container">
      <label className="forecast-container__fc-title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((day, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="forecast-container__fc-item-container">
                  <div>
                        <img
                            className="forecast-image"
                            src={require(`../../assets/icons/${day.weather[0].icon}.png`)}
                            alt="Weather icon"
                        />
                        <label className="forecast-day">{actualWeak[index]}</label>
                  </div>
                    <div>
                        <label className="forecast-description">{day.weather[0].description}</label>
                        <label className="forecast-temp-min-max">
                            {Math.round(day.main.temp_min)}°C /{" "}
                            {Math.round(day.main.temp_max)}°C
                        </label>
                    </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <div className="forecast-panel-info">
                    <div className="forecast-panel-info-item">
                        <label>Pressure:</label>
                        <label>{day.main.pressure} hPa</label>
                    </div>
                    <div className="forecast-panel-info-item">
                        <label>Clouds:</label>
                        <label>{day.clouds.all}%</label>
                    </div>
                    <div className="forecast-panel-info-item">
                        <label>Sea level:</label>
                        <label>{day.main.sea_level}m</label>
                    </div>
                    <div className="forecast-panel-info-item">
                        <label>Humidity:</label>
                        <label>{day.main.humidity}%</label>
                    </div>
                    <div className="forecast-panel-info-item">
                        <label>Wind speed:</label>
                        <label>{day.wind.speed}m/s</label>
                    </div>
                    <div className="forecast-panel-info-item">
                        <label>Feels like:</label>
                        <label>{day.main.feels_like}°C</label>
                    </div>
                </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Forecast;
