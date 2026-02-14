"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClipboardList, Package, Truck, CheckCircle2, Clock } from "lucide-react"

type OrderStatus = "Processing" | "Packed" | "Delivered"

interface Order {
  id: string
  customer: string
  items: string
  total: string
  time: string
  status: OrderStatus
}

const orders: Order[] = [
  {
    id: "ORD-1247",
    customer: "Ramesh Gowda",
    items: "Nandini Milk x2, Atta 5kg, Toor Dal",
    total: "542",
    time: "2 min ago",
    status: "Processing",
  },
  {
    id: "ORD-1246",
    customer: "Lakshmi Devi",
    items: "Rice 10kg, Cooking Oil, Sugar 2kg",
    total: "1,280",
    time: "8 min ago",
    status: "Processing",
  },
  {
    id: "ORD-1245",
    customer: "Prakash Kumar",
    items: "Bru Coffee, Parle-G x3, Maggi x5",
    total: "385",
    time: "15 min ago",
    status: "Packed",
  },
  {
    id: "ORD-1244",
    customer: "Anjali Shetty",
    items: "Vegetables assorted, Curd x2",
    total: "230",
    time: "22 min ago",
    status: "Packed",
  },
  {
    id: "ORD-1243",
    customer: "Venkatesh R.",
    items: "Besan 1kg, Jaggery, Coconut Oil",
    total: "465",
    time: "35 min ago",
    status: "Delivered",
  },
  {
    id: "ORD-1242",
    customer: "Meena Kumari",
    items: "Tide 1kg, Vim Bar x3, Dettol",
    total: "312",
    time: "48 min ago",
    status: "Delivered",
  },
]

const statusConfig: Record<OrderStatus, { icon: React.ElementType; color: string; bg: string }> = {
  Processing: { icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10 text-amber-400 border-amber-400/20" },
  Packed: { icon: Package, color: "text-sky-400", bg: "bg-sky-400/10 text-sky-400 border-sky-400/20" },
  Delivered: { icon: CheckCircle2, color: "text-emerald", bg: "bg-emerald/10 text-emerald border-emerald/20" },
}

export function OrderQueueTile() {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-card-foreground">Order Queue</h2>
        </div>
        <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
          {orders.filter((o) => o.status !== "Delivered").length} active
        </Badge>
      </div>
      <ScrollArea className="h-[320px] md:h-[360px]">
        <div className="flex flex-col">
          {orders.map((order, index) => {
            const config = statusConfig[order.status]
            const StatusIcon = config.icon
            return (
              <div
                key={order.id}
                className={`flex items-start justify-between p-4 transition-colors hover:bg-secondary/30 ${
                  index !== orders.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-muted-foreground">{order.id}</span>
                    <span className="text-xs text-muted-foreground">{order.time}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-card-foreground">{order.customer}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{order.items}</p>
                </div>
                <div className="ml-3 flex flex-col items-end gap-1.5">
                  <Badge
                    variant="outline"
                    className={`${config.bg} flex items-center gap-1 border text-[10px]`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {order.status}
                  </Badge>
                  <span className="text-sm font-semibold text-card-foreground">
                    {"₹"}{order.total}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
