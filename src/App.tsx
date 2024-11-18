import React, { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react';
import { WeatherCard } from './components/WeatherCard';
import { SearchBar } from './components/SearchBar';
import { HourlyForecast } from './components/HourlyForecast';
import { fetchWeatherData, fetchHourlyForecast } from './api/weather';
import { formatTime } from './utils/dateUtils';
import type { WeatherData,  HourlyForecastItem } from './types/weather';

const DEFAULT_CITY = 'London';

function App() {
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<HourlyForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const weatherData = await fetchWeatherData(searchCity);
      setWeather(weatherData);

      const forecastData = await fetchHourlyForecast(
        weatherData.coord.lat,
        weatherData.coord.lon
      );

      const hourlyForecast = forecastData.list
        .slice(0, 5)
        .map(item => ({
          time: item === forecastData.list[0] ? 'Now' : formatTime(item.dt_txt),
          temp: item.main.temp,
          icon: item.weather[0].icon
        }));

      setForecast(hourlyForecast);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchCity]);

  const handleSearch = () => {
    if (city.trim()) {
      setSearchCity(city);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Cloud className="text-white" size={32} />
          <h1 className="text-3xl font-bold text-white">Weather App</h1>
        </div>

        <div className="flex justify-center mb-8">
          <SearchBar
            value={city}
            onChange={setCity}
            onSearch={handleSearch}
          />
        </div>

        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 bg-white/90 p-4 rounded-lg">{error}</div>
        ) : weather ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <WeatherCard
                temp={weather.main.temp}
                humidity={weather.main.humidity}
                windSpeed={weather.wind.speed}
                description={weather.weather[0].description}
                icon={weather.weather[0].icon}
              />
            </div>
            
            <div className="mt-6">
              <HourlyForecast forecasts={forecast} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;