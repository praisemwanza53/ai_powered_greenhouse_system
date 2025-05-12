"use client"

import { Cloud, CloudDrizzle, CloudRain, Sun, CloudSun } from "lucide-react"
import type { WeatherForecastData } from "@/lib/types"

interface WeatherForecastProps {
  forecast: WeatherForecastData[]
}

export function WeatherForecast({ forecast }: WeatherForecastProps) {
  // Add a null check for the forecast prop
  if (!forecast || forecast.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <p className="text-muted-foreground">No weather forecast data available</p>
      </div>
    )
  }

  // Map weather conditions to icons
  const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase() || "") {
      case "sunny":
        return Sun
      case "partly cloudy":
        return CloudSun
      case "cloudy":
        return Cloud
      case "light rain":
        return CloudDrizzle
      case "showers":
      case "rain":
        return CloudRain
      default:
        return Cloud
    }
  }

  return (
    <div className="space-y-4">
      {forecast.map((day, index) => {
        const WeatherIcon = getWeatherIcon(day.condition)
        return (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-skyblue-100">
                <WeatherIcon className="h-5 w-5 text-skyblue-600" />
              </div>
              <div>
                <p className="font-medium">{day.day || "Unknown"}</p>
                <p className="text-sm text-muted-foreground">{day.condition || "Unknown"}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{day.temp !== undefined ? `${day.temp}°C` : "N/A"}</p>
              <p className="text-sm text-muted-foreground">Rain: {day.precipitation || "N/A"}</p>
            </div>
          </div>
        )
      })}
      <div className="pt-2 text-xs text-muted-foreground">
        <p>Weather data automatically adjusts greenhouse systems</p>
      </div>
    </div>
  )
}
