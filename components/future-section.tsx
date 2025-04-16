import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function FutureSection() {
  const liquidations = [
    {
      id: 1,
      symbol: "BTC/USDT",
      price: "$61,245.00",
      change: 2.3,
      liquidated: "$0.98M",
      exchange: "BINANCE",
      time: "Today at 2:49 PM",
      initial: "B",
    },
    {
      id: 2,
      symbol: "ETH/USDT",
      price: "$3,421.75",
      change: 1.8,
      liquidated: "$0.64M",
      exchange: "BINANCE",
      time: "Today at 2:49 PM",
      initial: "E",
    },
    {
      id: 3,
      symbol: "SOL/USDT",
      price: "$142.32",
      change: -3.2,
      liquidated: "$1.21M",
      exchange: "BINANCE",
      time: "Today at 2:49 PM",
      initial: "S",
    },
    {
      id: 4,
      symbol: "DOGE/USDT",
      price: "$0.1732",
      change: 5.7,
      liquidated: "$0.51M",
      exchange: "BINANCE",
      time: "Today at 2:49 PM",
      initial: "D",
    },
    {
      id: 5,
      symbol: "XRP/USDT",
      price: "$0.5423",
      change: -1.2,
      liquidated: "$0.37M",
      exchange: "BINANCE",
      time: "Today at 2:49 PM",
      initial: "X",
    },
  ]

  return (
    <div className="divide-y divide-gray-200">
      {liquidations.map((item) => (
        <div key={item.id} className="p-4 hover:bg-gray-50">
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8 bg-gray-200">
              <AvatarFallback className="text-xs font-medium">{item.initial}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.symbol}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{item.price}</p>
                  <p className={`text-xs ${item.change > 0 ? "text-green-500" : "text-red-500"}`}>
                    {item.change > 0 ? "+" : ""}
                    {item.change}%
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`inline ml-1 ${item.change > 0 ? "rotate-0" : "rotate-180"}`}
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Liquidated Short at</p>
                  <p className="text-sm font-medium">{item.liquidated}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">on {item.exchange}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
