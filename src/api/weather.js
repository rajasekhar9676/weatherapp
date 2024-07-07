// src/api/weather.js
const API_KEY = 'c38830bf2a8357cbe409834f95e4973d';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`;


export const getWeatherByCity = async (city) => {
  const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
  const data = await response.json();
  return data;
};

export const get5DayForecastByCity = async (city) => {
  const response = await fetch(`${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
  const data = await response.json();
  return data;
};














