import { NextResponse } from "next/server"
import { fetchFeedItems } from "@/lib/feed-service"
import { getSourceConfig } from "@/lib/config-service"

export async function GET() {
  try {
    // Get user's source configuration
    const config = await getSourceConfig()
    const enabledSources = config?.sources || ["reddit", "tradingview", "bbc", "x", "facebook"]
    const customUrls = config?.customUrls || []

    // Fetch feed items from enabled sources
    const feedItems = await fetchFeedItems(enabledSources, customUrls)

    return NextResponse.json({ items: feedItems })
  } catch (error) {
    console.error("Error fetching feed:", error)
    return NextResponse.json({ error: "Failed to fetch feed" }, { status: 500 })
  }
}