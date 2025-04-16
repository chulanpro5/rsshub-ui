export interface FeedItem {
  id: string
  title?: string
  content: string
  author?: string
  authorAvatar?: string
  pubDate?: string
  link?: string
  source: string
  price?: string
  symbol?: string
  media?: string[] // Array of image/media URLs
}

export interface SourceConfig {
  sources: string[]
  customUrls?: string[]
}

export interface AppSettings {
  refreshInterval: number
  darkMode: boolean
  maxItems: number
  rsshubUrl: string
  notifications?: boolean
  saveItems?: boolean
  searchEnabled?: boolean
  soundAlerts?: boolean
  compactView?: boolean
  autoRefresh?: boolean
  mobileNotifications?: boolean
}
