"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, AlertTriangle, Clock, IndianRupee, Loader2 } from "lucide-react"

interface CreditEntry {
  id: number
  customer: string
  amount: number
  created_at: string
}

function getDaysSince(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

function getDaysColor(days: number) {
  if (days >= 20) return "text-rose-500"
  if (days >= 10) return "text-amber-400"
  return "text-emerald-500"
}

function getDaysBg(days: number) {
  if (days >= 20) return "bg-rose-500/10 text-rose-500 border-rose-500/20"
  if (days >= 10) return "bg-amber-400/10 text-amber-400 border-amber-400/20"
  return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
}

export function UdhaarLedgerTile() {
  const [credits, setCredits] = useState<CreditEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
        // In a real app, you might have a specific endpoint for credit orders: /api/orders?is_credit=true
        // For now, we'll filter client-side
        const response = await fetch(`${backendUrl}/api/orders`)
        if (response.ok) {
          const data = await response.json()
          const creditOrders = data
            .filter((o: any) => o.is_credit)
            .map((o: any) => ({
              id: o.id,
              customer: "Customer", // Placeholder until we have customer extraction
              amount: o.total_estimate,
              created_at: o.created_at
            }))
          setCredits(creditOrders)
        }
      } catch (error) {
        console.error("Failed to fetch credit ledger:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCredits()
    const interval = setInterval(fetchCredits, 60000) // Poll every 1 min
    return () => clearInterval(interval)
  }, [])

  const totalCredit = credits.reduce((sum, c) => sum + (c.amount || 0), 0)

  return (
    <div className="flex flex-col h-full rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border p-4 bg-card">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-rose-500" />
          <h2 className="text-sm font-semibold text-card-foreground">Udhaar Ledger</h2>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-1">
          <IndianRupee className="h-3 w-3 text-rose-500" />
          <span className="text-xs font-bold text-rose-500">
            {totalCredit.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <ScrollArea className="flex-1">
        {loading && credits.length === 0 ? (
           <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="flex flex-col">
            {credits.map((entry, index) => {
              const days = getDaysSince(entry.created_at)
              return (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-4 transition-colors hover:bg-secondary/30 ${
                    index !== credits.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-card-foreground">Voice Order #{entry.id}</p>
                      {days >= 20 && (
                        <AlertTriangle className="h-3 w-3 text-rose-500" />
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3 flex flex-col items-end gap-1.5 shrink-0">
                    <span className={`text-sm font-bold ${getDaysColor(days)}`}>
                      ₹{entry.amount}
                    </span>
                    <Badge
                      variant="outline"
                      className={`${getDaysBg(days)} border text-[10px] whitespace-nowrap`}
                    >
                      {days}d due
                    </Badge>
                  </div>
                </div>
              )
            })}
             {credits.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                  <p className="text-sm">No pending credits</p>
                </div>
              )}
          </div>
        )}
      </ScrollArea>

      <div className="border-t border-border p-3 bg-card mt-auto">
        <p className="text-center text-xs text-muted-foreground">
          {credits.length} customers with pending credit
        </p>
      </div>
    </div>
  )
}
