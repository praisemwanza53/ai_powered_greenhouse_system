import type {
  ZoneData,
  ScheduleData,
  WeatherForecastData,
  EnvironmentHistoryData,
  SmartRulesData,
  SystemOverviewData,
  CropData,
} from "@/lib/types"

// Mock database implementation
// In a real application, this would connect to a real database

// Mock data
const mockZones: ZoneData[] = [
  {
    id: 1,
    name: "Vanilla Orchids",
    active: true,
    temperature: 26.5,
    humidity: 82,
    moisture: 68,
    light: 5200,
    co2: 450,
    lastWatered: "Today, 6:00 AM",
    nextScheduled: "Tomorrow, 5:30 AM",
    cropType: "Vanilla Orchid",
  },
  {
    id: 2,
    name: "Saffron Crocus",
    active: true,
    temperature: 17.2,
    humidity: 55,
    moisture: 62,
    light: 7800,
    co2: 420,
    lastWatered: "Today, 6:15 AM",
    nextScheduled: "Tomorrow, 5:45 AM",
    cropType: "Saffron Crocus",
  },
  {
    id: 3,
    name: "Seedling Nursery",
    active: false,
    temperature: 24.8,
    humidity: 75,
    moisture: 71,
    light: 4500,
    co2: 480,
    lastWatered: "Yesterday, 6:00 AM",
    nextScheduled: "Tomorrow, 6:00 AM",
    cropType: "Mixed Seedlings",
  },
  {
    id: 4,
    name: "Experimental Zone",
    active: false,
    temperature: 22.3,
    humidity: 68,
    moisture: 65,
    light: 6200,
    co2: 430,
    lastWatered: "Yesterday, 6:15 AM",
    nextScheduled: "Tomorrow, 6:15 AM",
    cropType: "Research Crops",
  },
  {
    id: 5,
    name: "Tropical Plants",
    active: false,
    temperature: 28.1,
    humidity: 85,
    moisture: 72,
    light: 4800,
    co2: 460,
    lastWatered: "Yesterday, 6:30 AM",
    nextScheduled: "Tomorrow, 6:30 AM",
    cropType: "Tropical Mix",
  },
  {
    id: 6,
    name: "Arid Plants",
    active: false,
    temperature: 23.5,
    humidity: 45,
    moisture: 52,
    light: 8500,
    co2: 410,
    lastWatered: "Yesterday, 6:45 AM",
    nextScheduled: "Tomorrow, 6:45 AM",
    cropType: "Desert Plants",
  },
]

const mockSchedules: ScheduleData[] = [
  {
    id: 1,
    name: "Morning Routine",
    time: "5:30 AM",
    days: ["Mon", "Wed", "Fri"],
    zones: [1, 2, 3],
    duration: 15,
    active: true,
    actions: ["Watering", "Ventilation"],
  },
  {
    id: 2,
    name: "Evening Misting",
    time: "6:30 PM",
    days: ["Tue", "Thu", "Sat"],
    zones: [1, 3, 5],
    duration: 10,
    active: true,
    actions: ["Misting", "Lighting"],
  },
  {
    id: 3,
    name: "Weekend Care",
    time: "7:00 AM",
    days: ["Sun"],
    zones: [1, 2, 3, 4, 5, 6],
    duration: 30,
    active: false,
    actions: ["Watering", "Ventilation", "Misting", "Heating"],
  },
]

const mockEnvironmentHistory: EnvironmentHistoryData[] = [
  { date: "Mon", temperature: 25.2, humidity: 78, soilMoisture: 65, light: 5500, co2: 440 },
  { date: "Tue", temperature: 24.8, humidity: 76, soilMoisture: 62, light: 5800, co2: 430 },
  { date: "Wed", temperature: 26.1, humidity: 80, soilMoisture: 68, light: 5200, co2: 450 },
  { date: "Thu", temperature: 25.5, humidity: 79, soilMoisture: 70, light: 5400, co2: 445 },
  { date: "Fri", temperature: 24.9, humidity: 77, soilMoisture: 67, light: 5600, co2: 435 },
  { date: "Sat", temperature: 25.3, humidity: 78, soilMoisture: 66, light: 5500, co2: 440 },
  { date: "Sun", temperature: 25.8, humidity: 81, soilMoisture: 69, light: 5300, co2: 455 },
]

const mockWeatherForecast: WeatherForecastData[] = [
  { day: "Today", temp: 28, condition: "Sunny", precipitation: "0%" },
  { day: "Tomorrow", temp: 26, condition: "Partly Cloudy", precipitation: "10%" },
  { day: "Wednesday", temp: 24, condition: "Cloudy", precipitation: "20%" },
  { day: "Thursday", temp: 22, condition: "Light Rain", precipitation: "60%" },
  { day: "Friday", temp: 23, condition: "Showers", precipitation: "70%" },
]

const mockSmartRules: SmartRulesData = {
  weatherAdjust: true,
  moistureAdjust: true,
  temperatureAdjust: true,
  lightAdjust: true,
}

const mockCrops: CropData[] = [
  {
    id: 1,
    name: "Vanilla Orchid",
    type: "Tropical Orchid",
    optimalTemperature: "24-30°C",
    optimalHumidity: "80-85%",
    optimalLight: "Filtered sunlight",
    optimalSoilMoisture: "65-75%",
    growthStage: "Vegetative",
    plantedDate: "2023-10-15",
    notes: "Climbing well on support structures",
  },
  {
    id: 2,
    name: "Saffron Crocus",
    type: "Flowering Plant",
    optimalTemperature: "15-18°C",
    optimalHumidity: "40-60%",
    optimalLight: "Full sun",
    optimalSoilMoisture: "50-65%",
    growthStage: "Flowering",
    plantedDate: "2023-09-01",
    harvestDate: "2023-11-15",
    notes: "Flowers developing well, expect good saffron yield",
  },
]

const mockActionEvents: any[] = []

// Mock database implementation
export const db = {
  zones: {
    findAll: async (): Promise<ZoneData[]> => {
      return [...mockZones]
    },
    findById: async (id: number): Promise<ZoneData | null> => {
      const zone = mockZones.find((z) => z.id === id)
      return zone ? { ...zone } : null
    },
    update: async (id: number, data: Partial<ZoneData>): Promise<ZoneData> => {
      const index = mockZones.findIndex((z) => z.id === id)
      if (index === -1) {
        throw new Error(`Zone with ID ${id} not found`)
      }

      mockZones[index] = { ...mockZones[index], ...data }
      return { ...mockZones[index] }
    },
  },
  schedules: {
    findAll: async (): Promise<ScheduleData[]> => {
      return [...mockSchedules]
    },
    findById: async (id: number): Promise<ScheduleData | null> => {
      const schedule = mockSchedules.find((s) => s.id === id)
      return schedule ? { ...schedule } : null
    },
    create: async (data: Omit<ScheduleData, "id">): Promise<ScheduleData> => {
      const newId = Math.max(...mockSchedules.map((s) => s.id), 0) + 1
      const newSchedule: ScheduleData = {
        id: newId,
        ...data,
      }
      mockSchedules.push(newSchedule)
      return { ...newSchedule }
    },
    update: async (id: number, data: Partial<ScheduleData>): Promise<ScheduleData> => {
      const index = mockSchedules.findIndex((s) => s.id === id)
      if (index === -1) {
        throw new Error(`Schedule with ID ${id} not found`)
      }

      mockSchedules[index] = { ...mockSchedules[index], ...data }
      return { ...mockSchedules[index] }
    },
    delete: async (id: number): Promise<void> => {
      const index = mockSchedules.findIndex((s) => s.id === id)
      if (index === -1) {
        throw new Error(`Schedule with ID ${id} not found`)
      }

      mockSchedules.splice(index, 1)
    },
  },
  environmentHistory: {
    getHistory: async (): Promise<EnvironmentHistoryData[]> => {
      return [...mockEnvironmentHistory]
    },
  },
  weatherForecast: {
    getForecast: async (): Promise<WeatherForecastData[]> => {
      return [...mockWeatherForecast]
    },
  },
  settings: {
    getSmartRules: async (): Promise<SmartRulesData> => {
      return { ...mockSmartRules }
    },
    updateSmartRules: async (data: SmartRulesData): Promise<void> => {
      Object.assign(mockSmartRules, data)
    },
  },
  crops: {
    findAll: async (): Promise<CropData[]> => {
      return [...mockCrops]
    },
    findById: async (id: number): Promise<CropData | null> => {
      const crop = mockCrops.find((c) => c.id === id)
      return crop ? { ...crop } : null
    },
    create: async (data: Omit<CropData, "id">): Promise<CropData> => {
      const newId = Math.max(...mockCrops.map((c) => c.id), 0) + 1
      const newCrop: CropData = {
        id: newId,
        ...data,
      }
      mockCrops.push(newCrop)
      return { ...newCrop }
    },
    update: async (id: number, data: Partial<CropData>): Promise<CropData> => {
      const index = mockCrops.findIndex((c) => c.id === id)
      if (index === -1) {
        throw new Error(`Crop with ID ${id} not found`)
      }

      mockCrops[index] = { ...mockCrops[index], ...data }
      return { ...mockCrops[index] }
    },
    delete: async (id: number): Promise<void> => {
      const index = mockCrops.findIndex((c) => c.id === id)
      if (index === -1) {
        throw new Error(`Crop with ID ${id} not found`)
      }

      mockCrops.splice(index, 1)
    },
  },
  actionEvents: {
    create: async (data: any): Promise<any> => {
      const newId = mockActionEvents.length + 1
      const newEvent = { id: newId, ...data }
      mockActionEvents.push(newEvent)
      return { ...newEvent }
    },
    updateActiveEvent: async (zoneId: number, data: any): Promise<void> => {
      const index = mockActionEvents.findIndex((e) => e.zoneId === zoneId && !e.endTime)

      if (index !== -1) {
        mockActionEvents[index] = { ...mockActionEvents[index], ...data }
      }
    },
  },
  dashboard: {
    getOverview: async (): Promise<SystemOverviewData> => {
      const activeZones = mockZones.filter((z) => z.active).length
      const avgTemperature = Number.parseFloat(
        (mockZones.reduce((sum, zone) => sum + zone.temperature, 0) / mockZones.length).toFixed(1),
      )
      const avgHumidity = Math.round(mockZones.reduce((sum, zone) => sum + zone.humidity, 0) / mockZones.length)
      const avgMoisture = Math.round(mockZones.reduce((sum, zone) => sum + zone.moisture, 0) / mockZones.length)
      const avgLight = Math.round(mockZones.reduce((sum, zone) => sum + zone.light, 0) / mockZones.length)
      const avgCO2 = Math.round(mockZones.reduce((sum, zone) => sum + (zone.co2 || 400), 0) / mockZones.length)

      return {
        activeZones,
        totalZones: mockZones.length,
        waterUsage: 128,
        waterUsageChange: -32,
        avgTemperature,
        tempOptimalRange: "20-28°C",
        avgHumidity,
        humidityOptimalRange: "60-80%",
        avgMoisture,
        moistureOptimalRange: "60-75%",
        lightIntensity: avgLight,
        lightOptimalRange: "4000-8000 lux",
        co2Level: avgCO2,
        co2OptimalRange: "400-600 ppm",
        nextScheduledTime: "5:30 AM",
        nextScheduledDay: "Tomorrow",
        nextScheduledZones: "Zones 1, 2, 3",
      }
    },
  },
}
