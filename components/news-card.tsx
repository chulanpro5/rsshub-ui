"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { FeedItem } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import {
  DollarSign,
  Bookmark,
  Share2,
  MessageSquare,
  ThumbsUp,
  ExternalLink,
  RssIcon as Reddit,
  Facebook,
  Twitter,
  Newspaper,
} from "lucide-react"

interface NewsCardProps {
  item: FeedItem
}

export default function NewsCard({ item }: NewsCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Format the published date
  const formattedDate = item.pubDate ? formatDistanceToNow(new Date(item.pubDate), { addSuffix: true }) : "Today"

  // Get the appropriate icon based on source
  const getSourceIcon = () => {
    switch (item.source) {
      case "reddit":
        return <Reddit className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "x":
        return <Twitter className="h-4 w-4" />
      case "tradingview":
        return <DollarSign className="h-4 w-4" />
      case "bbc":
        return <Newspaper className="h-4 w-4" />
      default:
        return <Newspaper className="h-4 w-4" />
    }
  }

  // Get the appropriate avatar fallback based on source
  const getAvatarFallback = () => {
    switch (item.source) {
      case "reddit":
        return "R"
      case "facebook":
        return "FB"
      case "x":
        return "X"
      case "tradingview":
        return "$"
      case "bbc":
        return "BBC"
      default:
        return "N"
    }
  }

  // Get source color
  const getSourceColor = () => {
    switch (item.source) {
      case "reddit":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "facebook":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "x":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "tradingview":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "bbc":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    }
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center p-4 pb-2 space-y-0">
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={item.authorAvatar || "/placeholder.svg?height=40&width=40"}
              alt={item.author || "Author"}
            />
            <AvatarFallback>{getAvatarFallback()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium dark:text-gray-200">{item.author ? item.author : (item.source.replace("custom-", "").toUpperCase() || "Unknown")}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <Badge variant="outline" className={`capitalize flex items-center space-x-1 ${getSourceColor()}`}>
            {getSourceIcon()}
            <span>{item.source.replace("custom-", "")}</span>
          </Badge>
          {item.source === "tradingview" && item.price && (
            <Badge variant="secondary" className="font-mono dark:bg-gray-700 dark:text-gray-200">
              {item.price}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {item.title && <h3 className="font-medium mb-2 dark:text-gray-200 text-lg">{item.title}</h3>}
        <div
          className="text-sm text-gray-700 dark:text-gray-300 border-l-4 border-gray-200 dark:border-gray-600 pl-3 py-1"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
        {/* Show media images for Twitter (x) */}
        {item.source === "x" && item.media && item.media.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {item.media.map((url, idx) => {
              const isVideo = url.endsWith('.mp4');
              return isVideo ? (
                <video
                  key={url + idx}
                  src={url}
                  controls
                  className="rounded-md max-h-48 object-cover border dark:border-gray-700"
                  style={{ maxWidth: '100%', flex: '1 1 150px' }}
                  poster={undefined}
                />
              ) : (
                <img
                  key={url + idx}
                  src={url}
                  alt={item.title || 'media'}
                  className="rounded-md max-h-48 object-cover border dark:border-gray-700"
                  style={{ maxWidth: '100%', flex: '1 1 150px' }}
                  loading="lazy"
                />
              );
            })}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500 dark:text-gray-400">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span className="text-xs">Like</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500 dark:text-gray-400">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">Comment</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500 dark:text-gray-400">
            <Share2 className="h-4 w-4 mr-1" />
            <span className="text-xs">Share</span>
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 px-2 ${isBookmarked ? "text-yellow-500 dark:text-yellow-400" : "text-gray-500 dark:text-gray-400"}`}
            onClick={toggleBookmark}
          >
            <Bookmark className="h-4 w-4 mr-1" fill={isBookmarked ? "currentColor" : "none"} />
            <span className="text-xs">{isBookmarked ? "Saved" : "Save"}</span>
          </Button>
          {item.link && (
            <Button variant="outline" size="sm" className="h-8 px-2" asChild>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                <span className="text-xs">Read</span>
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
