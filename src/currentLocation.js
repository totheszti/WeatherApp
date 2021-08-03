import React from "react";
import Clock from "react-live-clock";
import Forecast from './forecast';
import loader from './assets/fidgetspinner.gif'
import apiKeys from "./apiKeys";
import classNames from 'classnames';
import ReactAnimatedWeather from "react-animated-weather";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const dateBuilder = (d) => {
    let months = [
        "Január",
        "Február",
        "Március",
        "Április",
        "Május",
        "Június",
        "Július",
        "Augusztus",
        "Szeptember",
        "Október",
        "November",
        "December",
    ];
    let days = [
        "Vasárnap",
        "Hétfő",
        "Kedd",
        "Szerda",
        "Csütörtök",
        "Péntek",
        "Szombat",
    ];

    let apiKey = "";

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${year} ${month} ${date} ( ${day} )`;
};

const defaults = {
    color: "white",
    size: 112,
    animate: true,
};

class Weather extends React.Component {
    state = {
        lat: undefined,
        lon: undefined,
        errorMessage: undefined,
        temperatureC: undefined,
        temperatureF: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: "CLEAR_DAY",
        sunrise: undefined,
        sunset: undefined,
        errorMsg: undefined,
    };

    componentDidMount() {
        if (navigator.geolocation) {
            debugger
            this.getPosition()
                .then((position) => {
                    this.getWeather(position.coords.latitude, position.coords.longitude);
                })
                .catch((err) => {
                    this.getWeather(28.67, 77.22);
                    alert(
                        "Engedélyezd a helymeghatározást!"
                    );
                });
        } else {
            alert("Nem elérhető helyzet");
        }

        this.timerID = setInterval(
            () => this.getWeather(this.state.lat, this.state.lon),
            600000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getPosition = (options) => {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    };
    getWeather = async (lat, lon) => {
        const api_call = await fetch(
            `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&&lang=hu&APPID=${apiKeys.key}`
        );

        const data = await api_call.json();
        this.setState({
            lat: lat,
            lon: lon,
            city: data.name,
            temperatureC: Math.round(data.main.temp),
            humidity: data.main.humidity,
            feelsLike: Math.round(data.main.feels_like),
            main: data.weather[0].main,
            country: data.sys.country,
            // sunrise: this.getTimeFromUnixTimeStamp(data.sys.sunrise),

            // sunset: this.getTimeFromUnixTimeStamp(data.sys.sunset),
        });
        switch (this.state.main) {
            case "Haze":
                this.setState({icon: "CLEAR_DAY"});
                break;
            case "Clouds":
                this.setState({icon: "CLOUDY"});
                break;
            case "Rain":
                this.setState({icon: "RAIN"});
                break;
            case "Snow":
                this.setState({icon: "SNOW"});
                break;
            case "Dust":
                this.setState({icon: "WIND"});
                break;
            case "Drizzle":
                this.setState({icon: "SLEET"});
                break;
            case "Fog":
                this.setState({icon: "FOG"});
                break;
            case "Smoke":
                this.setState({icon: "FOG"});
                break;
            case "Tornado":
                this.setState({icon: "WIND"});
                break;
            default:
                this.setState({icon: "CLEAR_DAY"});
        }
    };

    render() {
        if(this.apiKey === ""){
            return (
                <Popup >
                    <div>Add meg az API kulcsodat!</div>
                    <form className="form-horizontal">
                        <input type="text" className="form-control" value={this.apiKey}/>
                    </form>
                </Popup>
            )
        }
        else {
            if (!this.state) {
                return <span>Töltődik...</span>;
            } else if (this.state.temperatureC) {
                return (
                    <React.Fragment>
                        <div className={classNames('city', {
                            'bg-clear': this.state.main === "Clear",
                            'bg-haze': this.state.main === "Haze",
                            'bg-clouds': this.state.main === "Clouds",
                            'bg-rain': this.state.main === "Rain",
                            'bg-snow': this.state.main === "Snow",
                            'bg-dust': this.state.main === "Dust",
                            'bg-drizzle': this.state.main === "Drizzle",
                            'bg-fog': this.state.main === "Fog",
                            'bg-smoke': this.state.main === "Smoke",
                            'bg-tornado': this.state.main === "Tornado"
                        })}>
                            <div className="title">
                                <h2>{this.state.city}</h2>
                                <h3>{this.state.country}</h3>
                            </div>
                            <div className="mb-icon">
                                {" "}
                                <ReactAnimatedWeather
                                    icon={this.state.icon}
                                    color={defaults.color}
                                    size={defaults.size}
                                    animate={defaults.animate}
                                />
                            </div>
                            <div className="date-time">
                                <div className="dmy">
                                    <div id="txt"></div>
                                    <div className="current-time">
                                        <Clock format="HH:mm:ss" interval={1000} ticking={true}/>
                                    </div>
                                    <div className="current-date">{dateBuilder(new Date())}</div>
                                </div>
                                <div className="temperature">
                                    <p>
                                        {this.state.temperatureC}°C
                                    </p>
                                </div>
                                <div style={{
                                    width: "100%",
                                    float: "right"
                                }}>
                                    <div className="w-100">
                                        <p className="feelsLike">
                                            Hőérzet: {this.state.feelsLike}°C
                                        </p>
                                    </div>
                                    {/*<div className="w-100">*/}
                                    {/*    <h3 className="text-white" style={{ float: "right"}}>*/}
                                    {/*        Páratartalom: {this.state.humidity}%*/}
                                    {/*    </h3>*/}
                                    {/*</div>*/}
                                </div>
                            </div>

                        </div>
                        <Forecast icon={this.state.icon} weather={this.state.main}/>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%"
                        }}>
                            <h3 style={{color: "white", marginTop: "10px"}}>
                                A jelenlegi tartózkodási helyed rögtön megjelenik... Kis türelmet
                            </h3>
                        </div>
                    </React.Fragment>
                );
            }
        }
    }
}

export default Weather;
