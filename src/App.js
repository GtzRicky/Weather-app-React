import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faWind, faThermometerFull } from '@fortawesome/free-solid-svg-icons';

const WeatherRequest = (latitude, longitude) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=279503ff216edb4af8c0028c83b74843`;
  return fetch(url);
}

const DisplayInfo = ({city, country, description, humidity, windspeed, pressure}) => {

  return (
    <div>
      <h2>{city}, {country}</h2>
        <div className="Conditions">
          <p>{description}</p>
          <p><FontAwesomeIcon icon={faTint}/> Humidity = {humidity} %</p>
          <p><FontAwesomeIcon icon={faWind}/> Wind speed = {windspeed} m/s</p>
          <p><FontAwesomeIcon icon={faThermometerFull}/> Pressure = {pressure} mb</p>
        </div>
    </div>
  );
}

// const Temperature = ({ weatherIcon, temperature }) => {
//   const {degrees, setDegrees} = useState(temperature);
//   const [unit, setUnit] = useState("°");
//   const [converter, setConverter] = useState(true);

//   const handleConverter = () => {
//     setConverter(!converter);
//     if (converter) {
//       return (
//         setDegrees((degrees * 1.800) + 32),
//         setUnit("°F")
//       )
//     } else {
//       return (
//         setDegrees((degrees - 32) / 1.800),
//         setUnit("°C")
//       )
//     }
//   }

//   return (
//     <div className="Box">
//       <div className="Temp">
//         <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} />
//         <p>{degrees}{unit}</p>
//         <button onClick={handleConverter}>C° / F°</button>
//       </div>
//     </div>
//   )
// }

function App() {
  
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [temp, setTemp] = useState(0);

  useEffect( () => {
    navigator.geolocation.getCurrentPosition((position) => {
      WeatherRequest(position.coords.latitude, position.coords.longitude)
      .then((response) => response.json())
      .then((data) => {
        setCity(data.name);
        setCountry(data.sys.country);
        setIcon(data.weather[0].icon);
        setDescription(data.weather[0].description);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setPressure(data.main.pressure);
        setTemp(data.main.temp);
      });
    });
  }, []);

  const [unit, setUnit] = useState("°");
  const [converter, setConverter] = useState(true);

  const handleConverter = () => {
    setConverter(!converter);
    if (converter) {
      return (
        setTemp((temp * 1.800) + 32),
        setUnit("°F")
      )
    } else {
      return (
        setTemp((temp - 32) / 1.800),
        setUnit("°C")
      )
    }
  }

  return (
    <div className="App">
      <div className="Card">
        <div>
          <h1>Weather App</h1>
        </div>
        <div className="WeatherInfo">
          <div className="Temp">
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
            <p>{temp}{unit}</p>
            <button onClick={handleConverter}>C° / F°</button>
          </div>
          <DisplayInfo
            city={city}
            country={country}
            description={description}
            humidity={humidity}
            windspeed={windSpeed}
            pressure={pressure}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
