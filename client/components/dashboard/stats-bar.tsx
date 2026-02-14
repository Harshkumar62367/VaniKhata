"use client"

import { ShoppingCart, IndianRupee, Users, TrendingUp } from "lucide-react"

interface StatCard {
  label: string
  value: string
  change: string
  icon: React.ElementType
  positive: boolean
}

const stats: StatCard[] = [
  { label: "Today's Orders", value: "47", change: "+12%", icon: ShoppingCart, positive: true },
  { label: "Revenue", value: "₹18,450", change: "+8%", icon: IndianRupee, positive: true },
  { label: "Customers", value: "32", change: "+5%", icon: Users, positive: true },
  { label: "Avg. Order", value: "₹392", change: "-2%", icon: TrendingUp, positive: false },
]

export function StatsBar() {
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
                stat.positive ? "text-emerald" : "text-rose"
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
