import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CityNameContext } from "../components/CityNameContext";
import cloud from "../images/cloud.jpg";
import sun from "../images/sun.jpg";
import rain from "../images/rain.jpg";
import cold from "../images/cold.jpg";
import nature from "../images/nature.jpg";
import sunrise from "../images/sunrise.webp";
import sunset from "../images/sunset.jpg";
import '../style/style.css';

const Body = () => {
    const { city } = useContext(CityNameContext);
    const [weatherData, setWeatherData] = useState(null);
    const [image, setImage] = useState(nature);
    const apiKey = "26a56c46e48d72f1f7e5923533ebf686";

    const getWeather = () => {
        if (city) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
                .then(response => {
                    setWeatherData(response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.error("There was an error fetching the weather data!", error);
                });
        }
    };

    useEffect(() => {
        if (city) {
            getWeather();
        }
    }, []);

    useEffect(() => {
        if (weatherData) {
            updateImage(weatherData.list[0].weather[0].main);
        } else {
            setImage(cloud);
        }
    }, [weatherData]);

    const convertKelvinToCelsius = (kelvin) => {
        return (kelvin - 273.15).toFixed(2);
    };

    const updateImage = (weatherMain) => {
        switch (weatherMain) {
            case "Clouds":
                setImage(cloud);
                break;
            case "Clear":
                setImage(sun);
                break;
            case "Rain":
                setImage(rain);
                break;
            case "Snow":
                setImage(cold);
                break;
            default:
                setImage(nature);
                break;
        }
    };

    return (
        <div className="Full-body" >
            <div className='box'>
            <div className="card-2">
                <div className="card-1" >
                    <img src={image} alt="weather" />
                    <div className="weather-inf">
                        {weatherData ? (
                            <div>
                                <h2>Weather in {city.slice(0,20)}</h2>
                                <p>Temperature: {convertKelvinToCelsius(weatherData.list[0].main.temp)}°C</p>
                                <p>Weather: {weatherData.list[0].weather[0].description}</p>
                                <p>Humidity: {weatherData.list[0].main.humidity}%</p>
                                <p>Wind: {weatherData.list[0].wind.speed}</p>
                            </div>
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
                <div className="card-3">
                    {weatherData ? (
                        <div>
                            <div className="sunrise">
                                <img src={sunrise} alt="sunrise" />
                                <p>Sunrise: {new Date(weatherData.city.sunrise * 1000).toLocaleTimeString()}</p>
                            </div>
                            <div className="sunset">
                                <img src={sunset} alt="sunset" />
                                <p>Sunset: {new Date(weatherData.city.sunset * 1000).toLocaleTimeString()}</p>
                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
            </div>
            <div className="forecast">
                {weatherData && weatherData.list.slice(1, 6).map((forecast, index) => (
                    <div key={index} className="forecast-t">
                        <p>Time: {new Date(forecast.dt * 1000).toLocaleTimeString()}</p>
                        <p>Temperature: {convertKelvinToCelsius(forecast.main.temp)}°C</p>
                        <p>Weather: {forecast.weather[0].description}</p>
                        <p>Humidity: {forecast.main.humidity}%</p>
                    </div>
                ))}
            </div>
            <div className="footer">
                <h4>Weather app made by Pranshu 2024</h4>
            </div>
        </div>
    );
};

export default Body;
