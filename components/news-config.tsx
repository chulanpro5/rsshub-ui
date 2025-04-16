"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { saveSourceConfig, getSourceConfig } from "@/lib/config-service"
import { PlusCircle, Trash2, RssIcon as Reddit, Facebook, Twitter, DollarSign, Newspaper } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function NewsConfig() {
  const { toast } = useToast()
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [customUrl, setCustomUrl] = useState("")
  const [customUrls, setCustomUrls] = useState<string[]>([])
  const [isUrlValid, setIsUrlValid] = useState(true)

  const sources = [
    { id: "reddit", name: "Reddit", icon: Reddit, disabled: true },
    { id: "facebook", name: "Facebook", icon: Facebook, disabled: true },
    { id: "x", name: "X", icon: Twitter, disabled: false },
    { id: "tradingview", name: "Tradingview", icon: DollarSign, disabled: true },
    { id: "bbc", name: "BBC News", icon: Newspaper, disabled: true },
  ]

  useEffect(() => {
    // Load saved configuration
    const loadConfig = async () => {
      const config = await getSourceConfig()
      if (config?.sources) {
        setSelectedSources(config.sources)
      } else {
        // Default to all sources if no config exists
        setSelectedSources(sources.map((source) => source.id))
      }
      if (config?.customUrls) {
        setCustomUrls(config.customUrls)
      }
    }

    loadConfig()
  }, [])

  const toggleSource = (sourceId: string) => {
    setSelectedSources((prev) => {
      if (prev.includes(sourceId)) {
        return prev.filter((id) => id !== sourceId)
      } else {
        return [...prev, sourceId]
      }
    })
  }

  const validateUrl = (url: string) => {
    try {
      new URL(url)
      return url.includes("rss") || url.includes("feed") || url.includes("xml")
    } catch (_) {
      return false
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setCustomUrl(url)
    setIsUrlValid(url === "" || validateUrl(url))
  }

  const addCustomUrl = () => {
    if (customUrl && validateUrl(customUrl) && !customUrls.includes(customUrl)) {
      setCustomUrls([...customUrls, customUrl])
      setCustomUrl("")
      setIsUrlValid(true)
    } else {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid RSS feed URL",
        variant: "destructive",
      })
    }
  }

  const removeCustomUrl = (url: string) => {
    setCustomUrls(customUrls.filter((u) => u !== url))
  }

  const saveConfig = async () => {
    await saveSourceConfig({
      sources: selectedSources,
      customUrls: customUrls,
    })
    toast({
      title: "Configuration saved",
      description: "Your news sources have been updated",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {sources.map((source) => (
          <div key={source.id} className="flex items-center space-x-2 mb-2 opacity-100">
            <source.icon className="h-5 w-5" />
            <Switch
              checked={selectedSources.includes(source.id)}
              onCheckedChange={() => !source.disabled && toggleSource(source.id)}
              disabled={!!source.disabled}
            />
            <span className={`text-sm font-medium dark:text-gray-200 ${source.disabled ? 'opacity-60' : ''}`}>{source.name}</span>
          </div>
        ))}
      </div>

      <div className="border-t dark:border-gray-700 pt-4">
        <h3 className="text-sm font-medium mb-2 dark:text-gray-200">Custom RSS URLs</h3>
        <div className="space-y-2 mb-4">
          <div className="flex space-x-2">
            <Input
              value={customUrl}
              onChange={handleUrlChange}
              placeholder="Enter RSS URL"
              className={`flex-1 ${!isUrlValid ? "border-red-500 dark:border-red-500" : ""}`}
            />
            <Button size="sm" onClick={addCustomUrl} type="button" disabled={!customUrl || !isUrlValid}>
              <PlusCircle className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          {!isUrlValid && customUrl && <p className="text-xs text-red-500 mt-1">Please enter a valid RSS feed URL</p>}
        </div>

        {customUrls.length > 0 && (
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto pr-1">
            {customUrls.map((url) => (
              <div
                key={url}
                className="flex items-center justify-between text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded"
              >
                <span className="truncate flex-1 mr-2 dark:text-gray-200">{url}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCustomUrl(url)}
                  className="h-6 w-6 p-0 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Badge variant="outline" className="dark:text-gray-300">
          {selectedSources.length} sources selected
        </Badge>
        <Button onClick={saveConfig}>Save Configuration</Button>
      </div>
    </div>
  )
}
