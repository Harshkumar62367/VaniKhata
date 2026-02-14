"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClipboardList, CheckCircle2, BookOpen } from "lucide-react"

interface Order {
  id: number
  raw_transcript: string
  items: any[]
  total_estimate: number
  created_at: string
  is_credit: boolean
  customer?: string
}

const statusConfig: Record<string, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  paid: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20", label: "Paid" },
  credit: { icon: BookOpen, color: "text-rose-500", bg: "bg-rose-500/10 text-rose-500 border-rose-500/20", label: "Udhaar" },
}

export function OrderQueueTile() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
        const response = await fetch(`${backendUrl}/api/orders`)
        if (response.ok) {
          const data = await response.json()
          setOrders(data)
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
    // Poll every 1 minute as requested
    const interval = setInterval(fetchOrders, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col h-full rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border p-4 bg-card">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-card-foreground">Order Queue</h2>
        </div>
        <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
          {orders.length} active
        </Badge>
      </div>
      
      <ScrollArea className="flex-1">
        {loading && orders.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="flex flex-col">
            {orders.map((order, index) => {
              // Derive status from is_credit
              const statusKey = order.is_credit ? 'credit' : 'paid'
              const config = statusConfig[statusKey]
              const StatusIcon = config.icon
              
              // Format items string
              const itemsText = Array.isArray(order.items) 
                ? order.items.map((i: any) => `${i.name} x${i.quantity}`).join(", ")
                : "No items detected"

              return (
                <div
                  key={order.id}
                  className={`flex items-start justify-between p-4 transition-colors hover:bg-secondary/30 ${
                    index !== orders.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">#{order.id}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {/* Placeholder for customer name logic later */}
                    <p className="text-sm font-medium text-card-foreground truncate">
                      {order.raw_transcript || "Voice Order"}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {itemsText}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium ${config.bg}`}>
                      <StatusIcon className="h-3 w-3" />
                      <span>{config.label}</span>
                    </div>
                    <span className="text-sm font-bold text-card-foreground">
                      ₹{order.total_estimate}
                    </span>
                  </div>
                </div>
              )
            })}
             {orders.length === 0 && !loading && (
               <div className="flex h-32 flex-col items-center justify-center text-muted-foreground">
                 <ClipboardList className="mb-2 h-8 w-8 opacity-20" />
                 <p className="text-xs">No orders yet</p>
               </div>
             )}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
