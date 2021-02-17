import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherRequest from './Components/Request';
import DisplayInfo from './Components/Display';
import { WindMillLoading } from 'react-loadingg';

function App() {
  
  const [render, setRender] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [temp, setTemp] = useState(0);
  const [background, setBackground] = useState("#0c91cf")

  
  const [unit, setUnit] = useState("°");
  const [converter, setConverter] = useState(true);

  const handleConverter = () => {
    setConverter(!converter);
    if (converter) {
      return (
        setTemp(Math.round((((temp * 1.800) + 32) * 100)) / 100),
        setUnit("°F")
      )
    } else {
      return (
        setTemp(Math.round((((temp - 32) / 1.800) * 100)) / 100),
        setUnit("°C")
      )
    }
  }

  useEffect( () => {
    navigator.geolocation.getCurrentPosition((position) => {
      WeatherRequest(position.coords.latitude, position.coords.longitude)
      .then((response) => response.json())
      .then((data) => {
        setRender(true);
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

  useEffect( () => {
    switch (description) {
      case "few clouds":
        setBackground("#c2c0c0")
        break;
      case "scattered clouds":
        setBackground("#757575")
        break;
      case "broken clouds":
        setBackground("#606060")
        break;
      case "shower rain":
        setBackground("#78c48b")
        break;
      case "rain":
        setBackground("38609c")
        break;
      case "thunderstorm":
        setBackground("#000000")
      default:
        break;
    }
  }, [description]);

  return (
    <div className="App" style={{backgroundColor: background}}>
      { render ? (
        <div className="Card">
          <div>
            <h1>Weather App</h1>
            <hr />
          </div>
          <div className="WeatherInfo">
            <div className="Temp">
              <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
              <p className="TempUnits">{temp}{unit}</p>
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
      ) : (<WindMillLoading color="#f4f9f9" size="large"/>)}
    </div>
  );
}

export default App;
