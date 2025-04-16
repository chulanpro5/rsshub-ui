import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TweetsSection() {
  const tweets = [
    {
      id: 1,
      author: "CryptoAnalyst",
      handle: "@crypto_analyst",
      content: "Bitcoin showing strong support at $60K level. Looking for a breakout above $62K in the next 24 hours.",
      time: "2h ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      author: "ETH_Daily",
      handle: "@eth_daily",
      content:
        "Ethereum gas fees dropping to lowest levels in months. Good time to make those transactions you've been putting off!",
      time: "4h ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      author: "DeFi_Pulse",
      handle: "@defi_pulse",
      content:
        "Total value locked in DeFi protocols reaches new ATH of $250B. The ecosystem continues to grow despite market volatility.",
      time: "6h ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="divide-y divide-gray-200">
      {tweets.map((tweet) => (
        <div key={tweet.id} className="p-4 hover:bg-gray-50">
          <div className="flex space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={tweet.avatar || "/placeholder.svg"} alt={tweet.author} />
              <AvatarFallback>{tweet.author[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1">
                <p className="text-sm font-medium text-gray-900">{tweet.author}</p>
                <p className="text-sm text-gray-500">{tweet.handle}</p>
                <span className="text-xs text-gray-500">•</span>
                <p className="text-xs text-gray-500">{tweet.time}</p>
              </div>
              <p className="text-sm text-gray-800 mt-1">{tweet.content}</p>
              <div className="mt-2 flex space-x-6">
                <button className="text-gray-500 hover:text-gray-600 text-xs flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <span>42</span>
                </button>
                <button className="text-gray-500 hover:text-gray-600 text-xs flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 12 7-7 7 7"></path>
                    <path d="M10 5v14"></path>
                  </svg>
                  <span>128</span>
                </button>
                <button className="text-gray-500 hover:text-gray-600 text-xs flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 2.1l4 4-4 4"></path>
                    <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4"></path>
                    <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2"></path>
                  </svg>
                  <span>23</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
