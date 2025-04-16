import type { AppSettings } from "./types"

// In a real app, this would be stored in a database or localStorage
let cachedSettings: AppSettings | null = null

export async function getSettings(): Promise<AppSettings | null> {
  // In a real app, fetch from API or localStorage
  if (!cachedSettings) {
    // Default settings
    cachedSettings = {
      refreshInterval: 5,
      darkMode: false,
      maxItems: 10,
      rsshubUrl: "http://qcks8sg8440os8o0s8cssook.35.186.152.46.sslip.io",
      notifications: false,
      saveItems: false,
      searchEnabled: true,
      soundAlerts: false,
      compactView: false,
      autoRefresh: true,
      mobileNotifications: false,
    }
  }

  return cachedSettings
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  // In a real app, save to API or localStorage
  cachedSettings = settings
}
