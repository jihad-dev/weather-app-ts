import React from 'react';

interface HourlyForecastProps {
  time: string;
  temp: number;
  icon: string;
}

function HourlyForecastItem({ time, temp, icon }: HourlyForecastProps) {
  return (
    <div className="flex flex-col items-center p-3">
      <span className="text-sm text-gray-600">{time}</span>
      <img
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt="weather icon"
        className="w-8 h-8"
      />
      <span className="font-semibold">{Math.round(temp)}°</span>
    </div>
  );
}

export function HourlyForecast({ forecasts }: { forecasts: HourlyForecastProps[] }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg overflow-x-auto">
      <h3 className="text-gray-700 font-semibold mb-3">Hourly Forecast</h3>
      <div className="flex space-x-4">
        {forecasts.map((forecast, index) => (
          <HourlyForecastItem key={index} {...forecast} />
        ))}
      </div>
    </div>
  );
}