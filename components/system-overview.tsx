import { Thermometer, Droplets, Cloud, Sun, Leaf, Wind } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SystemOverviewData } from "@/lib/types"

interface SystemOverviewProps {
  data: SystemOverviewData
}

export function SystemOverview({ data }: SystemOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temperature</CardTitle>
          <Thermometer className="h-4 w-4 text-skyblue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.avgTemperature}°C</div>
          <p className="text-xs text-muted-foreground">Optimal range: {data.tempOptimalRange}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Humidity</CardTitle>
          <Cloud className="h-4 w-4 text-skyblue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.avgHumidity}%</div>
          <p className="text-xs text-muted-foreground">Optimal range: {data.humidityOptimalRange}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
          <Droplets className="h-4 w-4 text-skyblue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.avgMoisture}%</div>
          <p className="text-xs text-muted-foreground">Optimal range: {data.moistureOptimalRange}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Light Intensity</CardTitle>
          <Sun className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.lightIntensity} lux</div>
          <p className="text-xs text-muted-foreground">Optimal range: {data.lightOptimalRange}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CO₂ Level</CardTitle>
          <Wind className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.co2Level} ppm</div>
          <p className="text-xs text-muted-foreground">Optimal range: {data.co2OptimalRange}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Water Usage</CardTitle>
          <Droplets className="h-4 w-4 text-skyblue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.waterUsage} L</div>
          <p className="text-xs text-muted-foreground">Today ({data.waterUsageChange}% than avg.)</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Zones</CardTitle>
          <Leaf className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.activeZones}/{data.totalZones}
          </div>
          <p className="text-xs text-muted-foreground">Zones with active systems</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Scheduled</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.nextScheduledTime}</div>
          <p className="text-xs text-muted-foreground">
            {data.nextScheduledDay} ({data.nextScheduledZones})
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

import { Calendar } from "lucide-react"
