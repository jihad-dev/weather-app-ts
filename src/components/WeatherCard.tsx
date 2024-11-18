import React from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  temp: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export function WeatherCard({ temp, humidity, windSpeed, description, icon }: WeatherCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">{Math.round(temp)}°C</h2>
          <p className="text-gray-600 capitalize mt-1">{description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="w-20 h-20"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Droplets className="text-blue-500" size={20} />
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="font-semibold">{humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="text-blue-500" size={20} />
          <div>
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="font-semibold">{windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}