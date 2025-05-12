import Link from "next/link"
import { ArrowLeft, Plus, Leaf, Thermometer, Droplets, Cloud, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/lib/db"

export default async function CropsPage() {
  const crops = await db.crops.findAll()

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Crop Management</h1>
            <p className="text-muted-foreground">Monitor and manage your greenhouse crops</p>
          </div>
          <Button asChild>
            <Link href="/crops/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Crop
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Crops</TabsTrigger>
          <TabsTrigger value="planned">Planned Crops</TabsTrigger>
          <TabsTrigger value="harvested">Harvested Crops</TabsTrigger>
          <TabsTrigger value="library">Crop Library</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {crops.map((crop) => (
              <Card key={crop.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{crop.name}</CardTitle>
                  <CardDescription>{crop.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative mb-4 overflow-hidden rounded-md bg-muted">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt={crop.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-muted-foreground">
                        <Thermometer className="mr-1 h-4 w-4" /> Temperature:
                      </span>
                      <span>{crop.optimalTemperature}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-muted-foreground">
                        <Cloud className="mr-1 h-4 w-4" /> Humidity:
                      </span>
                      <span>{crop.optimalHumidity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-muted-foreground">
                        <Sun className="mr-1 h-4 w-4" /> Light:
                      </span>
                      <span>{crop.optimalLight}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-muted-foreground">
                        <Droplets className="mr-1 h-4 w-4" /> Soil Moisture:
                      </span>
                      <span>{crop.optimalSoilMoisture}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Growth Stage:</span>
                      <span className="font-medium text-skyblue-600">{crop.growthStage}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Planted:</span>
                      <span>{new Date(crop.plantedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/crops/${crop.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Add New Crop</CardTitle>
                <CardDescription>Configure a new crop profile</CardDescription>
              </CardHeader>
              <CardContent className="flex h-[calc(100%-80px)] min-h-[300px] items-center justify-center">
                <Button asChild>
                  <Link href="/crops/new">
                    <Leaf className="mr-2 h-4 w-4" />
                    Add Crop Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="planned" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Planned Crops</CardTitle>
              <CardDescription>Crops scheduled for future planting</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">No planned crops yet. Add your first planned crop.</p>
            </CardContent>
            <CardFooter>
              <Button>Add Planned Crop</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="harvested" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Harvested Crops</CardTitle>
              <CardDescription>Historical data on harvested crops</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">No harvest records yet. They will appear here after harvesting.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crop Library</CardTitle>
              <CardDescription>Reference information for various crops</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Vanilla Orchid</h3>
                    <p className="text-sm text-muted-foreground">Tropical climbing orchid</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Saffron Crocus</h3>
                    <p className="text-sm text-muted-foreground">Flowering plant</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Cacao Tree</h3>
                    <p className="text-sm text-muted-foreground">Tropical evergreen</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Coffee Plant</h3>
                    <p className="text-sm text-muted-foreground">Tropical shrub</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Black Pepper</h3>
                    <p className="text-sm text-muted-foreground">Flowering vine</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <h3 className="font-medium">Cardamom</h3>
                    <p className="text-sm text-muted-foreground">Herbaceous perennial</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Browse Full Library</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
