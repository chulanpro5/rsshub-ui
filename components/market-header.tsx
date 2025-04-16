"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp } from "lucide-react"

export default function MarketHeader() {
  const [marketData, setMarketData] = useState({
    currencies: { value: 17042, change: null },
    marketCap: { value: 2.72, change: -4.24 },
    volume: { value: 82.22, change: 8.91 },
    btcDominance: { value: 60.87, change: -0.02 },
    ethPrice: { value: 6.95, change: 1.99 },
    ethGas: { value: 18, change: null },
  })

  // In a real app, you would fetch this data from an API
  useEffect(() => {
    // Simulate data updates
    const interval = setInterval(() => {
      // Small random fluctuations
      setMarketData((prev) => ({
        ...prev,
        marketCap: {
          value: +(prev.marketCap.value + (Math.random() * 0.02 - 0.01)).toFixed(2),
          change: +(prev.marketCap.change + (Math.random() * 0.1 - 0.05)).toFixed(2),
        },
        volume: {
          value: +(prev.volume.value + (Math.random() * 0.1 - 0.05)).toFixed(2),
          change: +(prev.volume.change + (Math.random() * 0.1 - 0.05)).toFixed(2),
        },
        btcDominance: {
          value: +(prev.btcDominance.value + (Math.random() * 0.02 - 0.01)).toFixed(2),
          change: +(prev.btcDominance.change + (Math.random() * 0.01 - 0.005)).toFixed(2),
        },
        ethPrice: {
          value: +(prev.ethPrice.value + (Math.random() * 0.02 - 0.01)).toFixed(2),
          change: +(prev.ethPrice.change + (Math.random() * 0.05 - 0.025)).toFixed(2),
        },
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm p-3 overflow-x-auto">
      <div className="flex space-x-8">
        <div className="flex-shrink-0">
          <span className="text-sm text-gray-500 dark:text-gray-400">Currencies:</span>{" "}
          <span className="font-medium dark:text-gray-200">{marketData.currencies.value.toLocaleString()}</span>
        </div>

        <div className="flex-shrink-0">
          <span className="text-sm text-gray-500 dark:text-gray-400">Market Cap$:</span>{" "}
          <span className="font-medium dark:text-gray-200">{marketData.marketCap.value.toFixed(2)}T</span>{" "}
          <span
            className={cn(
              "text-xs flex items-center",
              marketData.marketCap.change > 0 ? "text-green-500" : "text-red-500",
            )}
          >
            {marketData.marketCap.change > 0 ? (
              <ArrowUp className="h-3 w-3 mr-0.5" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-0.5" />
            )}
            {Math.abs(marketData.marketCap.change)}%
          </span>
        </div>

        <div className="flex-shrink-0">
          <span className="text-sm text-gray-500 dark:text-gray-400">24h Volume$:</span>{" "}
          <span className="font-medium dark:text-gray-200">{marketData.volume.value.toFixed(2)}B</span>{" "}
          <span
            className={cn(
              "text-xs flex items-center",
              marketData.volume.change > 0 ? "text-green-500" : "text-red-500",
            )}
          >
            {marketData.volume.change > 0 ? (
              <ArrowUp className="h-3 w-3 mr-0.5" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-0.5" />
            )}
            {Math.abs(marketData.volume.change)}%
          </span>
        </div>

        <div className="flex-shrink-0">
          <span className="text-sm text-gray-500 dark:text-gray-400">BTC Dominance:</span>{" "}
          <span className="font-medium dark:text-gray-200">{marketData.btcDominance.value}%</span>{" "}
          <span
            className={cn(
              "text-xs flex items-center",
              marketData.btcDominance.change > 0 ? "text-green-500" : "text-red-500",
            )}
          >
            {marketData.btcDominance.change > 0 ? (
              <ArrowUp className="h-3 w-3 mr-0.5" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-0.5" />
            )}
            {Math.abs(marketData.btcDominance.change)}%
          </span>
        </div>

        <div className="flex-shrink-0">
          <span className="text-sm text-gray-500 dark:text-gray-400">ETH:</span>{" "}
          <span className="font-medium dark:text-gray-200">{marketData.ethPrice.value}K</span>{" "}
          <span
            className={cn(
              "text-xs flex items-center",
              marketData.ethPrice.change > 0 ? "text-green-500" : "text-red-500",
            )}
          >
            {marketData.ethPrice.change > 0 ? (
              <ArrowUp className="h-3 w-3 mr-0.5" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-0.5" />
            )}
            {Math.abs(marketData.ethPrice.change)}%
          </span>
        </div>

        <div className="flex-shrink-0">
          <span className="text-sm text-gray-500 dark:text-gray-400">ETH Gas:</span>{" "}
          <span className="font-medium dark:text-gray-200">{marketData.ethGas.value} Gwei</span>
        </div>
      </div>
    </div>
  )
}
