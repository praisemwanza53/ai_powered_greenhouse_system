import Link from "next/link"
import {
  Leaf,
  Home,
  Calendar,
  Settings,
  Cloud,
  BarChart3,
  Thermometer,
  Droplets,
  MessageSquareText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnvironmentChart } from "@/components/environment-chart"
import { WeatherForecast } from "@/components/weather-forecast"
import { ZoneStatus } from "@/components/zone-status"
import { SystemOverview } from "@/components/system-overview"
import { getDashboardData } from "@/lib/data-service"

export default async function DashboardPage() {
  const dashboardData = await getDashboardData()

  // Add null checks for dashboard data
  const overview = dashboardData?.overview || {}
  const zones = dashboardData?.zones || []
  const schedules = dashboardData?.schedules || []
  const environmentHistory = dashboardData?.environmentHistory || []
  const weatherForecast = dashboardData?.weatherForecast || []
  const crops = dashboardData?.crops || []

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden border-r bg-skyblue-50/40 lg:block lg:w-64">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Leaf className="h-6 w-6 text-skyblue-600" />
              <span>SI Greenhouse App</span>
            </Link>
          </div>
          <div className="flex-1 px-4 py-4">
            <nav className="flex flex-col gap-1">
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link href="/zones">
                  <Thermometer className="h-4 w-4" />
                  Zones
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link href="/irrigation">
                  <Droplets className="h-4 w-4" />
                  Irrigation
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link href="/schedule">
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link href="/weather">
                  <Cloud className="h-4 w-4" />
                  Weather
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link href="/crops">
                  <Leaf className="h-4 w-4" />
                  Crops
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link href="/assistant">
                  <MessageSquareText className="h-4 w-4" />
                  Farmer Assistant
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link href="/analytics">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start gap-2" asChild>
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
          <div className="lg:hidden">
            <Leaf className="h-6 w-6 text-skyblue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <Tabs defaultValue="overview">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="zones">Zones</TabsTrigger>
                <TabsTrigger value="irrigation">Irrigation</TabsTrigger>
                <TabsTrigger value="crops">Crops</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Export Data
                </Button>
                <Button size="sm">System Settings</Button>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-4 pt-4">
              <SystemOverview data={overview} />

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle>Environment Monitoring</CardTitle>
                    <CardDescription>Last 7 days across all zones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {environmentHistory && environmentHistory.length > 0 ? (
                      <EnvironmentChart data={environmentHistory} />
                    ) : (
                      <div className="flex h-[300px] items-center justify-center">
                        <p className="text-muted-foreground">No environment data available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Weather Forecast</CardTitle>
                    <CardDescription>5-day forecast for your location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WeatherForecast forecast={weatherForecast} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="zones" className="space-y-4 pt-4">
              <ZoneStatus initialZones={zones} />
            </TabsContent>

            <TabsContent value="irrigation" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Irrigation Status</CardTitle>
                  <CardDescription>Current irrigation system status and water usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                      <Droplets className="h-8 w-8 text-skyblue-500" />
                      <h3 className="text-xl font-bold">{dashboardData?.overview?.waterUsage} L</h3>
                      <p className="text-sm text-muted-foreground">Today's Water Usage</p>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                      <div className="text-xl font-bold">{dashboardData?.overview?.activeZones}</div>
                      <p className="text-sm text-muted-foreground">Active Irrigation Zones</p>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border p-4">
                      <div className="text-xl font-bold">{dashboardData?.overview?.avgMoisture}%</div>
                      <p className="text-sm text-muted-foreground">Average Soil Moisture</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-4 font-medium">Quick Actions</h3>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Droplets className="mr-2 h-4 w-4" />
                        Water All Zones
                      </Button>
                      <Button variant="outline" size="sm">
                        Stop All Irrigation
                      </Button>
                      <Button variant="outline" size="sm">
                        Run Moisture Test
                      </Button>
                      <Button variant="outline" size="sm">
                        Check System Pressure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Water Usage History</CardTitle>
                  <CardDescription>Last 7 days of irrigation water usage</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">Water usage chart would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="crops" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Vanilla Orchid</CardTitle>
                    <CardDescription>Tropical climbing orchid</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative mb-4 overflow-hidden rounded-md bg-muted">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Vanilla Orchid"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Optimal Temperature:</span>
                        <span>24-30°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Humidity:</span>
                        <span>80-85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Light:</span>
                        <span>Filtered sunlight</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Growth Stage:</span>
                        <span>Vegetative</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Saffron Crocus</CardTitle>
                    <CardDescription>Flowering plant</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative mb-4 overflow-hidden rounded-md bg-muted">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="Saffron Crocus"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Optimal Temperature:</span>
                        <span>15-18°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Humidity:</span>
                        <span>40-60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Light:</span>
                        <span>Full sun</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Growth Stage:</span>
                        <span>Flowering</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Add New Crop</CardTitle>
                    <CardDescription>Configure a new crop profile</CardDescription>
                  </CardHeader>
                  <CardContent className="flex h-[calc(100%-80px)] items-center justify-center">
                    <Button className="gap-2">
                      <Leaf className="h-4 w-4" />
                      Add Crop Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
