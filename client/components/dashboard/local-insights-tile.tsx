"use client"

import { TrendingUp, ArrowUpRight, Sparkles } from "lucide-react"

interface TrendingItem {
  name: string
  change: string
  category: string
}

const trendingItems: TrendingItem[] = [
  { name: "Nandini Milk 500ml", change: "+32%", category: "Dairy" },
  { name: "Bru Gold Coffee", change: "+28%", category: "Beverages" },
  { name: "MTR Masala Dosa Mix", change: "+21%", category: "Ready Mix" },
  { name: "Cycle Agarbathi", change: "+18%", category: "Pooja" },
  { name: "Malgudi Filter Coffee", change: "+15%", category: "Beverages" },
]

const categoryColors: Record<string, string> = {
  Dairy: "bg-sky-400/10 text-sky-400",
  Beverages: "bg-amber-400/10 text-amber-400",
  "Ready Mix": "bg-primary/10 text-primary",
  Pooja: "bg-fuchsia-400/10 text-fuchsia-400",
}

export function LocalInsightsTile() {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-card-foreground">Trending Locally</h2>
        </div>
        <span className="text-xs text-muted-foreground">This week</span>
      </div>

      <div className="flex flex-col p-2">
        {trendingItems.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-md p-2.5 transition-colors hover:bg-secondary/30"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-secondary text-xs font-bold text-muted-foreground">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-card-foreground">{item.name}</p>
                <span
                  className={`inline-block mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium ${
                    categoryColors[item.category] || "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {item.category}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-emerald">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs font-bold">{item.change}</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
