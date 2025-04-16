"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { saveSettings, getSettings } from "@/lib/settings-service"
import { useToast } from "@/components/ui/use-toast"
import {
  Bell,
  Clock,
  Moon,
  RefreshCw,
  Save,
  Search,
  SlidersHorizontal,
  Volume2,
  Eye,
  Calendar,
  Smartphone,
} from "lucide-react"

export default function SettingsPanel() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
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
  })

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await getSettings()
      if (savedSettings) {
        setSettings({ ...settings, ...savedSettings })
      }
    }

    loadSettings()
  }, [])

  const handleSaveSettings = async () => {
    await saveSettings(settings)
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="rsshub-url" className="flex items-center text-sm font-medium dark:text-gray-200">
            <SlidersHorizontal className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            RSSHub URL
          </Label>
          <Input
            id="rsshub-url"
            value={settings.rsshubUrl}
            onChange={(e) => setSettings({ ...settings, rsshubUrl: e.target.value })}
            placeholder="https://rsshub.app"
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="refresh-interval" className="flex items-center text-sm font-medium dark:text-gray-200">
              <RefreshCw className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              Refresh Interval (minutes)
            </Label>
            <span className="text-sm font-medium dark:text-gray-200">{settings.refreshInterval}</span>
          </div>
          <Slider
            id="refresh-interval"
            min={1}
            max={60}
            step={1}
            value={[settings.refreshInterval]}
            onValueChange={(value) => setSettings({ ...settings, refreshInterval: value[0] })}
            className="dark:bg-gray-700"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="max-items" className="flex items-center text-sm font-medium dark:text-gray-200">
              <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              Max Items Per Source
            </Label>
            <span className="text-sm font-medium dark:text-gray-200">{settings.maxItems}</span>
          </div>
          <Slider
            id="max-items"
            min={5}
            max={50}
            step={5}
            value={[settings.maxItems]}
            onValueChange={(value) => setSettings({ ...settings, maxItems: value[0] })}
            className="dark:bg-gray-700"
          />
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-medium dark:text-gray-200">Display Options</h3>

          <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
            <Label htmlFor="dark-mode" className="flex items-center cursor-pointer text-sm dark:text-gray-200">
              <Moon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              Dark Mode
            </Label>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => setSettings({ ...settings, darkMode: checked })}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
            <Label htmlFor="compact-view" className="flex items-center cursor-pointer text-sm dark:text-gray-200">
              <Eye className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              Compact View
            </Label>
            <Switch
              id="compact-view"
              checked={settings.compactView}
              onCheckedChange={(checked) => setSettings({ ...settings, compactView: checked })}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
            <Label htmlFor="search" className="flex items-center cursor-pointer text-sm dark:text-gray-200">
              <Search className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              Enable Search
            </Label>
            <Switch
              id="search"
              checked={settings.searchEnabled}
              onCheckedChange={(checked) => setSettings({ ...settings, searchEnabled: checked })}
            />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-medium dark:text-gray-200">Notifications</h3>

          <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
            <Label htmlFor="notifications" className="flex items-center cursor-pointer text-sm dark:text-gray-200">
              <Bell className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              Desktop Notifications
            </Label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
            <Label htmlFor="sound-alerts" className="flex items-center cursor-pointer text-sm dark:text-gray-200">
              <Volume2 className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              Sound Alerts
            </Label>
            <Switch
              id="sound-alerts"
              checked={settings.soundAlerts}
              onCheckedChange={(checked) => setSettings({ ...settings, soundAlerts: checked })}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
            <Label
              htmlFor="mobile-notifications"
              className="flex items-center cursor-pointer text-sm dark:text-gray-200"
            >
              <Smartphone className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              Mobile Notifications
            </Label>
            <Switch
              id="mobile-notifications"
              checked={settings.mobileNotifications}
              onCheckedChange={(checked) => setSettings({ ...settings, mobileNotifications: checked })}
            />
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-medium dark:text-gray-200">Content Management</h3>

          <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
            <Label htmlFor="save-items" className="flex items-center cursor-pointer text-sm dark:text-gray-200">
              <Save className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              Save/Bookmark Items
            </Label>
            <Switch
              id="save-items"
              checked={settings.saveItems}
              onCheckedChange={(checked) => setSettings({ ...settings, saveItems: checked })}
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b dark:border-gray-700">
            <Label htmlFor="auto-refresh" className="flex items-center cursor-pointer text-sm dark:text-gray-200">
              <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              Auto Refresh Feed
            </Label>
            <Switch
              id="auto-refresh"
              checked={settings.autoRefresh}
              onCheckedChange={(checked) => setSettings({ ...settings, autoRefresh: checked })}
            />
          </div>
        </div>
      </div>

      <Button className="w-full" onClick={handleSaveSettings}>
        Save Settings
      </Button>
    </div>
  )
}
