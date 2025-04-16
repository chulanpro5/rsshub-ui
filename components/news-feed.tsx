"use client"

import { useState, useEffect, useCallback } from "react"
import type { FeedItem } from "@/lib/types"
import NewsCard from "@/components/news-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function NewsFeed() {
  const { toast } = useToast()
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])
  const [filteredItems, setFilteredItems] = useState<FeedItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch feed items on component mount
  useEffect(() => {
    fetchFeedData()
  }, [])

  const fetchFeedData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/feed")
      if (!response.ok) {
        throw new Error(`Failed to fetch feed: ${response.status}`)
      }
      const data = await response.json()
      setFeedItems(data.items || [])
      setFilteredItems(data.items || [])
    } catch (err) {
      console.error("Error fetching feed:", err)
      setError("Failed to load news feed. Please try again later.")
      toast({
        title: "Error loading feed",
        description: "Could not load the news feed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Group items by source
  const groupedItems: Record<string, FeedItem[]> = {}

  // Only process if filteredItems exists and has items
  if (filteredItems && filteredItems.length > 0) {
    filteredItems.forEach((item) => {
      if (!groupedItems[item.source]) {
        groupedItems[item.source] = []
      }
      groupedItems[item.source].push(item)
    })
  }

  // Get unique sources
  const sources = Object.keys(groupedItems)

  const filterItems = useCallback(() => {
    if (!feedItems || feedItems.length === 0) return

    let items = [...feedItems]

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      items = items.filter(
        (item) =>
          item.title?.toLowerCase().includes(term) ||
          false ||
          item.content.toLowerCase().includes(term) ||
          item.author?.toLowerCase().includes(term) ||
          false,
      )
    }

    // Apply sorting
    if (sortBy === "newest") {
      items.sort((a, b) => {
        if (!a.pubDate) return 1
        if (!b.pubDate) return -1
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
      })
    } else if (sortBy === "oldest") {
      items.sort((a, b) => {
        if (!a.pubDate) return -1
        if (!b.pubDate) return 1
        return new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime()
      })
    } else if (sortBy === "alphabetical") {
      items.sort((a, b) => {
        const titleA = a.title || ""
        const titleB = b.title || ""
        return titleA.localeCompare(titleB)
      })
    }

    setFilteredItems(items)
  }, [feedItems, searchTerm, sortBy])

  useEffect(() => {
    filterItems()
  }, [filterItems])

  const refreshFeed = async () => {
    await fetchFeedData()
    toast({
      title: "Feed refreshed",
      description: "Latest news items have been loaded",
    })
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Loading news feed...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 dark:text-red-400">{error}</p>
        <Button onClick={refreshFeed} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (!filteredItems || filteredItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No news items found. Try selecting different sources or adjusting your filters.
        </p>
        <Button onClick={refreshFeed} className="mt-4">
          Refresh Feed
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={refreshFeed} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 w-full flex overflow-x-auto">
          <TabsTrigger value="all" className="flex-1">
            All
          </TabsTrigger>
          {sources.map((source) => (
            <TabsTrigger key={source} value={source} className="flex-1 capitalize">
              {source.replace("custom-", "")}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredItems.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </TabsContent>

        {sources.map((source) => (
          <TabsContent key={source} value={source} className="space-y-4">
            {groupedItems[source].map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
