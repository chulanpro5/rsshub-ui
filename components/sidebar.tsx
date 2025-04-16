"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Sidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboards", href: "/", icon: "layout-dashboard" },
    { name: "News", href: "/news", icon: "newspaper" },
    { name: "Auto convert", href: "/convert", icon: "repeat" },
  ]

  const controlCenter = [
    { name: "Account", href: "/account", icon: "user" },
    { name: "Settings", href: "/settings", icon: "settings" },
    { name: "Pricing", href: "/pricing", icon: "credit-card" },
    { name: "Referrals", href: "/referrals", icon: "users" },
  ]

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold mr-2">
            N
          </div>
          <span className="text-lg font-semibold">Nippynews</span>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <div className="px-3 mb-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dashboards</h3>
          </div>
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  pathname === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    pathname === item.href ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-5 w-5",
                  )}
                >
                  {item.icon === "layout-dashboard" && (
                    <>
                      <rect width="7" height="9" x="3" y="3" rx="1" />
                      <rect width="7" height="5" x="14" y="3" rx="1" />
                      <rect width="7" height="9" x="14" y="12" rx="1" />
                      <rect width="7" height="5" x="3" y="16" rx="1" />
                    </>
                  )}
                  {item.icon === "newspaper" && (
                    <>
                      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                      <path d="M18 14h-8" />
                      <path d="M15 18h-5" />
                      <path d="M10 6h8v4h-8V6Z" />
                    </>
                  )}
                  {item.icon === "repeat" && (
                    <>
                      <path d="m17 2 4 4-4 4" />
                      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                      <path d="m7 22-4-4 4-4" />
                      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                    </>
                  )}
                </svg>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="px-3 mb-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Control Center</h3>
          </div>
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {controlCenter.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  pathname === item.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    pathname === item.href ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-5 w-5",
                  )}
                >
                  {item.icon === "user" && (
                    <>
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </>
                  )}
                  {item.icon === "settings" && (
                    <>
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                  {item.icon === "credit-card" && (
                    <>
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </>
                  )}
                  {item.icon === "users" && (
                    <>
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </>
                  )}
                </svg>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
