import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";

function Forecast(props) {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [weather, setWeather] = useState({});

    const search = (city) => {
        axios
            .get(
                `${apiKeys.base}weather?q=${
                    city != "[object Object]" ? city : query
                }&units=metric&APPID=${apiKeys.key}`
            )
            .then((response) => {
                setWeather(response.data);
                setQuery("");
            })
            .catch(function (error) {
                console.log(error);
                setWeather("");
                setQuery("");
                setError({ message: "nem található", query: query });
            });
    };

    // function checkTime(i) {
    //     if (i < 10) {
    //         i = "0" + i;
    //     } // add zero in front of numbers < 10
    //     return i;
    // }

    const defaults = {
        color: "white",
        size: 112,
        animate: true,
    };

    useEffect(() => {
        search("Pécs");
    }, []);

    return (
        <div className="forecast">
            <div className="today-weather">
                <h3>További városok:</h3>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Keresés..."
                        onChange={(e) => setQuery(e.target.value)}
                        onBlur={query !== "" ? search : ""}
                        value={query}
                    />
                </div>
                <ul>
                    {typeof weather.main != "undefined" ? (
                        <div>
                            {" "}
                            <li className="cityHead">
                                <p>
                                    {weather.name}, {weather.sys.country}
                                </p>
                                <img
                                    className="temp"
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                                />
                            </li>
                            <li>
                                Hőmérséklet{" "}
                                <span className="temp">
                  {Math.round(weather.main.temp)}°C ({weather.weather[0].main})
                </span>
                            </li>
                            <li>
                                Hőérzet{" "}
                                <span className="temp">
                  {Math.round(weather.main.feels_like)}°C
                </span>
                            </li>
                            <li>
                                Páratartalom{" "}
                                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
                            </li>
                            <li>
                                Szél{" "}
                                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
                            </li>
                        </div>
                    ) : (
                        <li>
                            {error.query} {error.message}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
export default Forecast;
