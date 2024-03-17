import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
  const API_KEY = '1ef7a828c6cd9b9789151757e2839882';

  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [precipitationIndication, setPrecipitationIndication] = useState(null);
  const [weatherId, setWeatherId] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState(null);
  const [sunriseTime, setSunriseTime] = useState(null);
  const [sunsetTime, setSunsetTime] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Sofia&appid=${API_KEY}`);
      const data = await response.json();

      const kelvinTemp = data.main.temp;
      const celsiusTemp = kelvinTemp - 273.15; 
      setTemperature(celsiusTemp.toFixed(2));

      const mps = data.wind.speed;
      const kmph = mps * 3.6;
      setWindSpeed(kmph.toFixed(2));

      const humidity = data.main.humidity;
      setHumidity(humidity);

      const weatherDescription = data.weather[0].description;
      setWeatherDescription(weatherDescription);

      const weatherId = data.weather[0].id;
      setWeatherId(weatherId);

      let precipitationIndication = "";
      if (weatherId >= 500 && weatherId <= 531) {
        precipitationIndication = "Възможно е да има валежи";
      } else if (weatherId >= 600 && weatherId <= 622) {
        precipitationIndication = "Възможно е да има снеговалеж";
      }
    
      setPrecipitationIndication(precipitationIndication);

      const sunriseTime = data.sys.sunrise;
      const sunsetTime = data.sys.sunset;
      console.log(sunriseTime);
      console.log(sunsetTime);
      const sunriseTimeFormatted = format(new Date(sunriseTime * 1000), 'HH:mm');
      const sunsetTimeFormatted = format(new Date(sunsetTime * 1000), 'HH:mm');
      setSunriseTime(sunriseTimeFormatted);
      setSunsetTime(sunsetTimeFormatted);
    };

    fetchTemperature();
  }, []);

  return (
    <div>
      <h1>Времето в София</h1>
      {temperature && <p>Температура: {temperature}°C</p>}
      {windSpeed && <p>Скорост на вятъра: {windSpeed} km/h</p>}
      {humidity && <p>Влажност: {humidity}%</p>}
      {weatherDescription && <p>Описание на времето: {weatherDescription}</p>}
      {precipitationIndication && <p>{precipitationIndication}</p>}
      {sunriseTime && <p>Изгрев: {sunriseTime}</p>}
      {sunsetTime && <p>Залез: {sunsetTime}</p>}
    </div>
  );
};

export default App;
