import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faWind, faThermometerFull } from '@fortawesome/free-solid-svg-icons';

const DisplayInfo = ({city, country, description, humidity, windspeed, pressure}) => {
    return (
      <div>
          <div className="Conditions">
            <h3>{city}, {country}</h3>
            <p>{description}</p>
            <p><FontAwesomeIcon icon={faTint}/> Humidity = {humidity} %</p>
            <p><FontAwesomeIcon icon={faWind}/> Wind speed = {windspeed} m/s</p>
            <p><FontAwesomeIcon icon={faThermometerFull}/> Pressure = {pressure} mb</p>
          </div>
      </div>
    );
}

export default DisplayInfo

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
  
  