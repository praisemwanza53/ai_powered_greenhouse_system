import Link from "next/link"
import { ArrowLeft, Droplets, Settings, BarChart3, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/lib/db"

export default async function IrrigationPage() {
  const zones = await db.zones.findAll()

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Irrigation Management</h1>
        <p className="text-muted-foreground">Monitor and control your smart irrigation system</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="zones">Zone Control</TabsTrigger>
          <TabsTrigger value="schedule">Irrigation Schedule</TabsTrigger>
          <TabsTrigger value="analytics">Water Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current irrigation system status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-2 py-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <Droplets className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-600">System Online</h3>
                  <p className="text-sm text-muted-foreground">All components functioning normally</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  System Diagnostics
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Water Usage</CardTitle>
                <CardDescription>Current and historical water consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">Today</span>
                      <span className="text-sm font-medium">128 L</span>
                    </div>
                    <Progress value={42} className="h-2" />
                    <p className="mt-1 text-xs text-muted-foreground">42% of daily average</p>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">This Week</span>
                      <span className="text-sm font-medium">876 L</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    <p className="mt-1 text-xs text-muted-foreground">68% of weekly average</p>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">This Month</span>
                      <span className="text-sm font-medium">3,240 L</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="mt-1 text-xs text-muted-foreground">75% of monthly average</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/irrigation/analytics">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Detailed Analytics
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Recent notifications and warnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2 rounded-lg border p-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                    <div>
                      <h4 className="text-sm font-medium">Low Water Pressure</h4>
                      <p className="text-xs text-muted-foreground">Zone 3 - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg border p-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                    <div>
                      <h4 className="text-sm font-medium">Moisture Sensor Calibration</h4>
                      <p className="text-xs text-muted-foreground">Zone 2 - Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg border p-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 text-green-500" />
                    <div>
                      <h4 className="text-sm font-medium">System Maintenance Complete</h4>
                      <p className="text-xs text-muted-foreground">All Zones - 3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Alerts
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common irrigation system operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button className="h-auto flex-col gap-2 p-4">
                  <Droplets className="h-8 w-8" />
                  <span>Water All Zones</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                  <Settings className="h-8 w-8" />
                  <span>System Settings</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                  <AlertTriangle className="h-8 w-8" />
                  <span>Run Diagnostics</span>
                </Button>
                <Button variant="outline" className="h-auto flex-col gap-2 p-4">
                  <BarChart3 className="h-8 w-8" />
                  <span>View Reports</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {zones.map((zone) => (
              <Card key={zone.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      Zone {zone.id}: {zone.name}
                    </CardTitle>
                    <div className={`h-3 w-3 rounded-full ${zone.active ? "bg-green-500" : "bg-gray-300"}`}></div>
                  </div>
                  <CardDescription>{zone.active ? "Currently irrigating" : "Irrigation off"}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Soil Moisture</span>
                      <span className={zone.moisture < 60 ? "text-amber-500" : "text-green-600"}>{zone.moisture}%</span>
                    </div>
                    <Progress value={zone.moisture} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Last Watered:</p>
                      <p>{zone.lastWatered}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Scheduled:</p>
                      <p>{zone.nextScheduled}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Droplets className="mr-2 h-4 w-4" />
                    Water Now
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/zones/${zone.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Irrigation Schedule</CardTitle>
              <CardDescription>Upcoming watering events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Morning Routine</h3>
                      <p className="text-sm text-muted-foreground">Zones 1, 2, 3</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">5:30 AM</p>
                      <p className="text-sm text-muted-foreground">Mon, Wed, Fri</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Evening Misting</h3>
                      <p className="text-sm text-muted-foreground">Zones 1, 3, 5</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">6:30 PM</p>
                      <p className="text-sm text-muted-foreground">Tue, Thu, Sat</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Weekend Care</h3>
                      <p className="text-sm text-muted-foreground">All Zones</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">7:00 AM</p>
                      <p className="text-sm text-muted-foreground">Sun</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/schedule">Manage Schedules</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Water Usage Analytics</CardTitle>
              <CardDescription>Detailed water consumption data</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground">Water usage analytics chart would appear here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Water Efficiency</CardTitle>
                <CardDescription>Water usage optimization metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weather-based Savings</p>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">320 L</p>
                      <p className="text-sm text-muted-foreground">24% reduction</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Moisture-based Savings</p>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">180 L</p>
                      <p className="text-sm text-muted-foreground">15% reduction</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Total Water Saved</p>
                      <p className="text-sm text-muted-foreground">This year</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">12,450 L</p>
                      <p className="text-sm text-muted-foreground">32% reduction</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Zone Comparison</CardTitle>
                <CardDescription>Water usage by zone</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Zone comparison chart would appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
