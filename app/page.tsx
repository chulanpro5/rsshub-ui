import NewsFeed from "@/components/news-feed"
import NewsConfig from "@/components/news-config"
import SettingsPanel from "@/components/settings-panel"
import MarketHeader from "@/components/market-header"

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <MarketHeader />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
          <div className="md:col-span-3 bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm sticky top-0 h-[calc(100vh-3rem)] overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">News Sources</h2>
            <NewsConfig />
          </div>
          <div className="md:col-span-6 bg-white dark:bg-gray-800 rounded-md shadow-sm" style={{height: 'calc(100vh - 3rem)', overflowY: 'auto'}}>
            <div className="p-4 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
              <h2 className="text-lg font-semibold dark:text-gray-100">News Feed</h2>
            </div>
            <NewsFeed />
          </div>
          <div className="md:col-span-3 bg-white dark:bg-gray-800 p-4 rounded-md shadow-sm sticky top-0 h-[calc(100vh-3rem)] overflow-hidden">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Settings</h2>
            <SettingsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
