"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, IndianRupee, Users, TrendingUp } from "lucide-react"

interface StatCard {
  label: string
  value: string
  change: string
  icon: React.ElementType
  positive: boolean
}

const initialStats: StatCard[] = [
  { label: "Total Orders", value: "0", change: "+0%", icon: ShoppingCart, positive: true },
  { label: "Revenue", value: "₹0", change: "+0%", icon: IndianRupee, positive: true },
  { label: "Customers", value: "0", change: "+0%", icon: Users, positive: true },
  { label: "Avg. Order", value: "₹0", change: "+0%", icon: TrendingUp, positive: true },
]

export function StatsBar() {
  const [stats, setStats] = useState<StatCard[]>(initialStats)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
        const response = await fetch(`${backendUrl}/api/stats`)
        if (response.ok) {
          const data = await response.json()
          setStats([
            { label: "Total Orders", value: data.orders.toString(), change: "+12%", icon: ShoppingCart, positive: true },
            { label: "Revenue", value: `₹${data.revenue.toLocaleString('en-IN')}`, change: "+8%", icon: IndianRupee, positive: true },
            { label: "Customers", value: data.customers.toString(), change: "+5%", icon: Users, positive: true },
            { label: "Avg. Order", value: `₹${data.avgOrder}`, change: "-2%", icon: TrendingUp, positive: false },
          ])
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 60000) // Poll every 1 min
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-border bg-card p-3 md:p-4"
        >
          <div className="flex items-center justify-between">
            <stat.icon className="h-4 w-4 text-muted-foreground" />
            <span
              className={`text-xs font-medium ${
                stat.positive ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {stat.change}
            </span>
          </div>
          <p className="mt-2 text-lg font-bold text-card-foreground md:text-xl">{stat.value}</p>
          <p className="text-xs text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
