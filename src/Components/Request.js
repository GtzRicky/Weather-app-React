import React from 'react';

const WeatherRequest = (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=279503ff216edb4af8c0028c83b74843`;
    return fetch(url);
  }
  
export default WeatherRequest
