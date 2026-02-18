import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [windDirection, setWindDirection] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState(null);
  const [sunriseTime, setSunriseTime] = useState(null);
  const [sunsetTime, setSunsetTime] = useState(null);
  const [dayLength, setDayLength] = useState(null);
  const [nightLength, setNightLength] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [icon, setIcon] = useState(null);
  const [error, setError] = useState(null);

  const getWindDirection = (deg) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5);
    return directions[index % 16];
  };

  useEffect(() => {
    if (!API_KEY) {
      setError('Липсва OpenWeather API ключ. Моля, задайте VITE_OPENWEATHER_API_KEY във вашия .env файл.');
      return;
    }
    const fetchWeatherInfo = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Novi Han&appid=${API_KEY}`);

        if (!response.ok) {
          throw new Error(`OpenWeather error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        //temp
        const kelvinTemp = data.main.temp;
        const celsiusTemp = kelvinTemp - 273.15;
        setTemperature(celsiusTemp.toFixed(1));

        //pressure
        const pressure = data.main.pressure;
        setPressure(pressure);

        //wind
        const mps = data.wind.speed;
        const kmph = mps * 3.6;
        setWindSpeed(kmph.toFixed(0));

        const deg = data.wind.deg;
        const direction = getWindDirection(deg);
        setWindDirection(direction);

        //humidity
        const humidity = data.main.humidity;
        setHumidity(humidity);

        //weather icon
        const icon = data.weather[0].icon;
        setIcon(icon);

        //precipitation
        const weatherDescription = data.weather[0].description;
        setWeatherDescription(weatherDescription);

        //sunrise / sunset
        const sunriseTime = data.sys.sunrise;
        const sunsetTime = data.sys.sunset;
        const sunriseTimeFormatted = format(new Date(sunriseTime * 1000), 'HH:mm');
        const sunsetTimeFormatted = format(new Date(sunsetTime * 1000), 'HH:mm');
        setSunriseTime(sunriseTimeFormatted);
        setSunsetTime(sunsetTimeFormatted);

        // Calculate day length
        const dayLengthSeconds = sunsetTime - sunriseTime;
        const hours = Math.floor(dayLengthSeconds / 3600);
        const minutes = Math.floor((dayLengthSeconds % 3600) / 60);
        setDayLength(`${hours}ч ${minutes}мин`);

        // Calculate night length (24 hours - day length)
        const nightLengthSeconds = 86400 - dayLengthSeconds;
        const nightHours = Math.floor(nightLengthSeconds / 3600);
        const nightMinutes = Math.floor((nightLengthSeconds % 3600) / 60);
        setNightLength(`${nightHours}ч ${nightMinutes}мин`);

        setError(null);
      } catch (err) {
        console.error(err);
        setError('Неуспешно зареждане на данните за времето. Опитайте отново по-късно.');
      }
    };

    fetchWeatherInfo();
  }, [API_KEY]);

  return (
    <div className="weather-info">
      <h1>Времето в Нови хан</h1>
      {error && <p className="error-message">{error}</p>}
      {temperature && <p><span style={{ color: 'yellow' }}>Температура: </span><b><span style={{ color: 'white' }}>{temperature}°C</span></b></p>}
      {pressure && <p><span style={{ color: 'yellow' }}>Атмосферно налягане: </span><b><span style={{ color: 'white' }}>{pressure} hPa</span></b></p>}
      {windSpeed && <p><span style={{ color: 'yellow' }}>Скорост на вятъра: </span><b><span style={{ color: 'white' }}>{windSpeed} km/h</span></b></p>}
      {windDirection && <p><span style={{ color: 'yellow' }}>Посока на вятъра: </span><b><span style={{ color: 'white' }}>{windDirection}</span></b></p>}
      {humidity && <p><span style={{ color: 'yellow' }}>Влажност: </span><b><span style={{ color: 'white' }}>{humidity}%</span></b></p>}
      {weatherDescription && <p><span style={{ color: 'yellow' }}>Описание на времето: </span><b><span style={{ color: 'white' }}>{weatherDescription}</span></b></p>}
      {sunriseTime && <p><span style={{ color: 'yellow' }}>Изгрев: </span><b><span style={{ color: 'white' }}>{sunriseTime}</span></b></p>}
      {sunsetTime && <p><span style={{ color: 'yellow' }}>Залез: </span><b><span style={{ color: 'white' }}>{sunsetTime}</span></b></p>}
      {dayLength && <p><span style={{ color: 'yellow' }}>Продължителност на деня: </span><b><span style={{ color: 'white' }}>{dayLength}</span></b></p>}
      {nightLength && <p><span style={{ color: 'yellow' }}>Продължителност на нощта: </span><b><span style={{ color: 'white' }}>{nightLength}</span></b></p>}
      {icon && (
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Weather Icon"
        />
      )}

    </div>
  );
}

export default App;
