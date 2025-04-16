import type { SourceConfig } from "./types"

// In a real app, this would be stored in a database or localStorage
let cachedConfig: SourceConfig | null = null

export async function getSourceConfig(): Promise<SourceConfig | null> {
  // In a real app, fetch from API or localStorage
  if (!cachedConfig) {
    // Default configuration
    cachedConfig = {
      sources: ["reddit", "tradingview", "bbc", "x", "facebook"],
      customUrls: [],
    }
  }

  return cachedConfig
}

export async function saveSourceConfig(config: SourceConfig): Promise<void> {
  // In a real app, save to API or localStorage
  cachedConfig = config
}
