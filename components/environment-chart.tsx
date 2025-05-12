"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from "recharts"
import type { EnvironmentHistoryData } from "@/lib/types"

interface EnvironmentChartProps {
  data: EnvironmentHistoryData[]
}

export function EnvironmentChart({ data }: EnvironmentChartProps) {
  const initialVisibleMetrics = {
    temperature: true,
    humidity: true,
    soilMoisture: true,
    light: false,
    co2: false,
  }

  const [visibleMetrics, setVisibleMetrics] = useState(initialVisibleMetrics)

  // Add null check for data
  if (!data || data.length === 0) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="text-muted-foreground">No environment data available</p>
      </div>
    )
  }

  const toggleMetric = (metric: keyof typeof visibleMetrics) => {
    setVisibleMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }))
  }

  // Create a safe version of the data with fallback values
  const safeData = data.map((item) => ({
    date: item.date || "",
    temperature: item.temperature ?? 0,
    humidity: item.humidity ?? 0,
    soilMoisture: item.soilMoisture ?? 0,
    light: item.light ?? 0,
    co2: item.co2 ?? 0,
  }))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => toggleMetric("temperature")}
          className={`text-xs px-2 py-1 rounded-full ${visibleMetrics.temperature ? "bg-skyblue-500 text-white" : "bg-gray-200"}`}
        >
          Temperature
        </button>
        <button
          onClick={() => toggleMetric("humidity")}
          className={`text-xs px-2 py-1 rounded-full ${visibleMetrics.humidity ? "bg-skyblue-500 text-white" : "bg-gray-200"}`}
        >
          Humidity
        </button>
        <button
          onClick={() => toggleMetric("soilMoisture")}
          className={`text-xs px-2 py-1 rounded-full ${visibleMetrics.soilMoisture ? "bg-skyblue-500 text-white" : "bg-gray-200"}`}
        >
          Soil Moisture
        </button>
        <button
          onClick={() => toggleMetric("light")}
          className={`text-xs px-2 py-1 rounded-full ${visibleMetrics.light ? "bg-skyblue-500 text-white" : "bg-gray-200"}`}
        >
          Light
        </button>
        <button
          onClick={() => toggleMetric("co2")}
          className={`text-xs px-2 py-1 rounded-full ${visibleMetrics.co2 ? "bg-skyblue-500 text-white" : "bg-gray-200"}`}
        >
          CO₂
        </button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={safeData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="date" className="text-sm" />
            <YAxis className="text-sm" />
            <Tooltip />
            <Legend />

            {visibleMetrics.temperature && (
              <Line
                type="monotone"
                dataKey="temperature"
                name="Temperature (°C)"
                stroke="var(--color-temperature)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            )}

            {visibleMetrics.humidity && (
              <Line
                type="monotone"
                dataKey="humidity"
                name="Humidity (%)"
                stroke="var(--color-humidity)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            )}

            {visibleMetrics.soilMoisture && (
              <Line
                type="monotone"
                dataKey="soilMoisture"
                name="Soil Moisture (%)"
                stroke="var(--color-soil-moisture)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            )}

            {visibleMetrics.light && (
              <Line
                type="monotone"
                dataKey="light"
                name="Light (lux)"
                stroke="var(--color-light)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            )}

            {visibleMetrics.co2 && (
              <Line
                type="monotone"
                dataKey="co2"
                name="CO₂ (ppm)"
                stroke="var(--color-co2)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
