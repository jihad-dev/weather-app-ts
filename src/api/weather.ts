





import { WeatherData, ForecastData } from "../types/weather";

const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY || "";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Helper function to handle fetching and error handling
async function fetchFromAPI<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(errorDetails.message || `Request failed with status ${response.status}`);
    }
    return response.json();
  } catch (error) {
    // If it's a network error or something else
    throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
  }
}

// Fetch current weather data by city name
export async function fetchWeatherData(city: string): Promise<WeatherData> {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  return fetchFromAPI<WeatherData>(url);
}

// Fetch hourly forecast data by latitude and longitude
export async function fetchHourlyForecast(
  lat: number,
  lon: number
): Promise<ForecastData> {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  return fetchFromAPI<ForecastData>(url);
}
