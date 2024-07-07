import { useState, useEffect } from 'react';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";
import sunny from '../assets/sunny.png';
import partlycloudy from '../assets/partlycloudy.png';
import cloudy from '../assets/cloudy.png';
import rain from '../assets/rain.png';
import rainy from '../assets/rainy.png';
import snow from '../assets/snow.png';
import storm from '../assets/storm.png';
import fog from '../assets/fog.png';
import overcast from '../assets/overcast.png';


// Custom icons for both day and night
const customIcons = {
  '01d': sunny,
  '01n': sunny,
  '02d': partlycloudy,
  '02n': partlycloudy,
  '03d': cloudy,
  '03n': cloudy,
  '04d': overcast,
  '04n': overcast,
  '09d': rain,
  '09n': rain,
  '10d': rainy,
  '10n': rainy,
  '11d': storm,
  '11n': storm,
  '13d': snow,
  '13n': snow,
  '50d': fog,
  '50n': fog,
};

function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({
    current: {
      temperature: 23,
      description: 'Partly Cloudy',
      icon: customIcons['01d']
    },
    forecast: [
      { day: 'Mon', high: 25, low: 18, icon: customIcons['01d'] },
      { day: 'Tue', high: 22, low: 16, icon: customIcons['03d'] },
      { day: 'Wed', high: 21, low: 15, icon: customIcons['03d'] },
      { day: 'Thu', high: 24, low: 17, icon: customIcons['01d'] },
      { day: 'Fri', high: 26, low: 19, icon: customIcons['01d'] }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c38830bf2a8357cbe409834f95e4973d&units=${unit}`
      );
      const currentWeather = response.data;
      const responseForecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c38830bf2a8357cbe409834f95e4973d&units=${unit}`
      );
      const forecastWeather = responseForecast.data;

      // Group forecast data by day
      const dailyForecast = forecastWeather.list.reduce((acc, item) => {
        const date = new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      }, {});

      // Extract relevant data for each day
      const forecast = Object.keys(dailyForecast).slice(0, 5).map((day) => {
        const dayData = dailyForecast[day];
        const temps = dayData.map(d => d.main.temp);
        const high = Math.max(...temps);
        const low = Math.min(...temps);
        const icon = dayData[Math.floor(dayData.length / 2)].weather[0].icon;

        return {
          day,
          high,
          low,
          icon: customIcons[icon] || `http://openweathermap.org/img/wn/${icon}@2x.png`,
        };
      });

      setWeatherData({
        current: {
          temperature: currentWeather.main.temp,
          description: currentWeather.weather[0].description,
          icon: customIcons[currentWeather.weather[0].icon] || `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`,
        },
        forecast,
      });
    } catch (error) {
      setError('Please enter a valid city name...');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=c38830bf2a8357cbe409834f95e4973d&units=${unit}`
        );
        const currentWeather = response.data;
        const responseForecast = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=New York&appid=c38830bf2a8357cbe409834f95e4973d&units=${unit}`
        );
        const forecastWeather = responseForecast.data;

        // Group forecast data by day
        const dailyForecast = forecastWeather.list.reduce((acc, item) => {
          const date = new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        }, {});

        // Extract relevant data for each day
        const forecast = Object.keys(dailyForecast).slice(0, 5).map((day) => {
          const dayData = dailyForecast[day];
          const temps = dayData.map(d => d.main.temp);
          const high = Math.max(...temps);
          const low = Math.min(...temps);
          const icon = dayData[Math.floor(dayData.length / 2)].weather[0].icon;

          return {
            day,
            high,
            low,
            icon: customIcons[icon] || `http://openweathermap.org/img/wn/${icon}@2x.png`,
          };
        });

        setWeatherData({
          current: {
            temperature: currentWeather.main.temp,
            description: currentWeather.weather[0].description,
            icon: customIcons[currentWeather.weather[0].icon] || `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`,
          },
          forecast,
        });
      } catch (error) {
        setError('Error fetching initial weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialWeather(); // Fetch initial data for New York
  }, [unit]); // Run effect on mount and when unit changes

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const handleClear = () => {
    setCity('');
  };
  const formatTemperature = (temp) => {
    return Math.round(temp);
  };
  
  const isMobile=window.innerWidth <=768

  return (

    <div className='bg-blue-200  p-2 lg:p-4 h-full flex justify-center items-center'>
    <div className="container p-4 bg-white shadow-lg  rounded-xl border-solid border-2 border-gray-500 font-sans h-full">
      <h1 className="text-2xl lg:text-4xl font-bold text-center lg:text-start mb-4 font-sans">Weather Dashboard</h1>

      <div className="flex mb-4 flex-col lg:flex-row">
        <div className='flex flex-row w-full relative items-center'>
          <input
            type="text"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full rounded-full bg-gray-200 relative"
            placeholder="Enter city name..."
            value={city}
            onChange={handleCityChange}
          />
          {city && <RxCross1 className='absolute right-4 cursor-pointer' onClick={handleClear} />}
        </div>
        <div className='flex flex-row'>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-2 w-[40%] md:w-[30%] lg:w-[150px] mt-3 lg:mt-0"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2 w-[40%] md:w-[30%] lg:w-[150px] mt-3 lg:mt-0"
          onClick={toggleUnit}
        >
          
          {unit === 'metric' ? 'Switch to °F' : 'Switch to °C'}
        </button>
        </div>

      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="bg-[#e6f2ff] p-4 rounded-lg shadow-md mb-4 border-solid border-2 border-[#b4d9ff] overflow-auto">
            <h2 className="text-xl font-bold mb-2">Current Weather in {city || 'New York'}</h2>
            <div className="flex items-center mb-2">
              <span className="text-2xl lg:text-5xl font-bold">{weatherData.current.temperature}°{unit === 'metric' ? 'C' : 'F'}</span>
              <img
                src={weatherData.current.icon}
                alt={weatherData.current.description}
                className="ml-4 h-16 w-16"
              />
            </div>
            <p className="text-gray-600 text-lg font-sans font-md antialiased">{weatherData.current.description}</p>
          </div>

          <h2 className="text-xl font-bold mb-4">5-Day Forecast</h2>

          <div className="grid grid-cols-5 gap-3 md:gap-4">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="bg-gray-100 p-1  md:p-4 rounded-lg shadow-md border-solid border-2 border-gray-200">
                <h3 className="text-xs md:text-lg font-bold mb-2">{day.day}</h3>
                <div className="flex justify-center items-center mb-2">
                  <div className="h-12 w-12 rounded-full  flex  items-start  justify-start md:items-center md:justify-center">
                    <img
                      src={day.icon}
                      alt={day.description}
                      className="h-9 w-10"
                    />
                  </div>
                </div>
                <p className={`text-gray-600 text-xs md:text-lg ${isMobile ? 'mobile-temp':''}`}>High: {isMobile ? formatTemperature(day.high):day.high}°{unit === 'metric' ? 'C' : 'F'}</p>
                <p className={`text-gray-600 text-xs md:text-lg ${isMobile ? 'mobile-view':''}` }>Low: {isMobile? formatTemperature(day.low): day.low}°{unit === 'metric' ? 'C' : 'F'}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  );
}

export default Home;
