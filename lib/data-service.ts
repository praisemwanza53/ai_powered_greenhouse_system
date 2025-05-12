import { db } from "@/lib/db"
import type { DashboardData } from "@/lib/types"

// This service layer handles data fetching and aggregation
export async function getDashboardData(): Promise<DashboardData> {
  // Fetch all the data we need for the dashboard
  const [zones, schedules, environmentHistory, weatherForecast, overview, crops] = await Promise.all([
    db.zones.findAll(),
    db.schedules.findAll(),
    db.environmentHistory.getHistory(),
    db.weatherForecast.getForecast(),
    db.dashboard.getOverview(),
    db.crops.findAll(),
  ])

  return {
    zones,
    schedules,
    environmentHistory,
    weatherForecast,
    overview,
    crops,
  }
}

// Function to simulate sensor data updates
// In a real application, this would connect to actual sensors
export async function simulateSensorUpdates() {
  // Get all zones
  const zones = await db.zones.findAll()

  // Update each zone's sensor readings with small random changes
  for (const zone of zones) {
    const tempChange = (Math.random() * 2 - 1) / 2 // Random number between -0.5 and 0.5
    const humidityChange = Math.floor(Math.random() * 5) - 2 // Random number between -2 and 2
    const moistureChange = Math.floor(Math.random() * 5) - 2 // Random number between -2 and 2
    const lightChange = Math.floor(Math.random() * 500) - 250 // Random number between -250 and 250
    const co2Change = Math.floor(Math.random() * 50) - 25 // Random number between -25 and 25

    let newTemp = Number.parseFloat((zone.temperature + tempChange).toFixed(1))
    let newHumidity = zone.humidity + humidityChange
    let newMoisture = zone.moisture + moistureChange
    let newLight = zone.light + lightChange
    let newCO2 = (zone.co2 || 400) + co2Change

    // Keep values within reasonable bounds
    newTemp = Math.max(15, Math.min(35, newTemp))
    newHumidity = Math.max(30, Math.min(95, newHumidity))
    newMoisture = Math.max(45, Math.min(85, newMoisture))
    newLight = Math.max(100, Math.min(10000, newLight))
    newCO2 = Math.max(350, Math.min(1500, newCO2))

    // Update the zone
    await db.zones.update(zone.id, {
      temperature: newTemp,
      humidity: newHumidity,
      moisture: newMoisture,
      light: newLight,
      co2: newCO2,
    })
  }
}

// Function to check and run scheduled actions
export async function checkAndRunSchedules() {
  const now = new Date()
  const currentDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][now.getDay()]
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  // Get all active schedules
  const schedules = await db.schedules.findAll()
  const activeSchedules = schedules.filter((s) => s.active)

  for (const schedule of activeSchedules) {
    // Parse schedule time
    const [hours, minutes] = schedule.time.split(":").map(Number)
    const isPM = schedule.time.includes("PM")
    const scheduleHour = isPM ? hours + 12 : hours

    // Check if this schedule should run now
    if (schedule.days.includes(currentDay) && scheduleHour === currentHour && minutes === currentMinute) {
      // Run this schedule
      for (const zoneId of schedule.zones) {
        // Activate the zone
        await db.zones.update(zoneId, {
          active: true,
        })

        // Log the scheduled action event
        await db.actionEvents.create({
          zoneId,
          startTime: new Date(),
          isManual: false,
          isScheduled: true,
          scheduleId: schedule.id,
          actions: schedule.actions || ["Watering"],
        })

        // Schedule the zone to turn off after the specified duration
        setTimeout(
          async () => {
            try {
              await db.zones.update(zoneId, {
                active: false,
              })

              await db.actionEvents.updateActiveEvent(zoneId, {
                endTime: new Date(),
              })
            } catch (error) {
              console.error(`Error turning off zone ${zoneId} after scheduled actions:`, error)
            }
          },
          schedule.duration * 60 * 1000,
        )
      }
    }
  }
}

// Initialize the system
export async function initializeSystem() {
  console.log("Initializing greenhouse care system...")

  // Set up interval to simulate sensor updates (every 30 seconds)
  setInterval(simulateSensorUpdates, 30 * 1000)

  // Set up interval to check schedules (every minute)
  setInterval(checkAndRunSchedules, 60 * 1000)

  // Run initial check
  await checkAndRunSchedules()

  console.log("Greenhouse care system initialized successfully!")
}
