// System Overview Types
export interface SystemOverviewData {
  activeZones: number
  totalZones: number
  waterUsage: number
  waterUsageChange: number
  avgTemperature: number
  tempOptimalRange: string
  avgHumidity: number
  humidityOptimalRange: string
  avgMoisture: number
  moistureOptimalRange: string
  lightIntensity: number
  lightOptimalRange: string
  co2Level: number
  co2OptimalRange: string
  nextScheduledTime: string
  nextScheduledDay: string
  nextScheduledZones: string
}

// Zone Types
export interface ZoneData {
  id: number
  name: string
  active: boolean
  temperature: number
  humidity: number
  moisture: number
  light: number
  co2?: number
  lastWatered: string
  nextScheduled: string
  cropType?: string
}

// Schedule Types
export interface ScheduleData {
  id: number
  name: string
  time: string
  days: string[]
  zones: number[]
  duration: number
  active: boolean
  actions?: string[]
}

export interface ScheduleFormData {
  name: string
  time: string
  duration: number
  days: string[]
  zones: number[]
  actions?: string[]
}

// Weather Types
export interface WeatherForecastData {
  day: string
  temp: number
  condition: string
  precipitation: string
}

// Environment History Types
export interface EnvironmentHistoryData {
  date: string
  temperature: number
  humidity: number
  soilMoisture: number
  light: number
  co2: number
}

// Smart Rules Types
export interface SmartRulesData {
  weatherAdjust: boolean
  moistureAdjust: boolean
  temperatureAdjust: boolean
  lightAdjust: boolean
}

// Crop Types
export interface CropData {
  id: number
  name: string
  type: string
  optimalTemperature: string
  optimalHumidity: string
  optimalLight: string
  optimalSoilMoisture: string
  growthStage: string
  plantedDate: string
  harvestDate?: string
  notes?: string
}

// Dashboard Data
export interface DashboardData {
  overview: SystemOverviewData
  zones: ZoneData[]
  schedules: ScheduleData[]
  environmentHistory: EnvironmentHistoryData[]
  weatherForecast: WeatherForecastData[]
  crops?: CropData[]
}
