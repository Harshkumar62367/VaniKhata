"use client"

import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, AlertTriangle, Clock, IndianRupee } from "lucide-react"

interface CreditEntry {
  customer: string
  amount: string
  days: number
  lastPayment: string
}

const credits: CreditEntry[] = [
  {
    customer: "Suresh Babu",
    amount: "2,450",
    days: 15,
    lastPayment: "Feb 1",
  },
  {
    customer: "Kavitha M.",
    amount: "1,820",
    days: 8,
    lastPayment: "Feb 7",
  },
  {
    customer: "Raju Patil",
    amount: "3,100",
    days: 22,
    lastPayment: "Jan 24",
  },
  {
    customer: "Deepa Nair",
    amount: "680",
    days: 3,
    lastPayment: "Feb 12",
  },
  {
    customer: "Ganesh Hegde",
    amount: "1,250",
    days: 30,
    lastPayment: "Jan 16",
  },
]

function getDaysColor(days: number) {
  if (days >= 20) return "text-rose"
  if (days >= 10) return "text-amber-400"
  return "text-emerald"
}

function getDaysBg(days: number) {
  if (days >= 20) return "bg-rose/10 text-rose border-rose/20"
  if (days >= 10) return "bg-amber-400/10 text-amber-400 border-amber-400/20"
  return "bg-emerald/10 text-emerald border-emerald/20"
}

export function UdhaarLedgerTile() {
  const totalCredit = credits.reduce(
    (sum, c) => sum + parseInt(c.amount.replace(",", "")),
    0
  )

  return (
    <div className="flex flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-rose" />
          <h2 className="text-sm font-semibold text-card-foreground">Udhaar Ledger</h2>
        </div>
        <div className="flex items-center gap-1 rounded-md bg-rose/10 px-2 py-1">
          <IndianRupee className="h-3 w-3 text-rose" />
          <span className="text-xs font-bold text-rose">
            {totalCredit.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <ScrollArea className="h-[260px] md:h-[300px]">
        <div className="flex flex-col">
          {credits.map((entry, index) => (
            <div
              key={entry.customer}
              className={`flex items-center justify-between p-4 transition-colors hover:bg-secondary/30 ${
                index !== credits.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-card-foreground">{entry.customer}</p>
                  {entry.days >= 20 && (
                    <AlertTriangle className="h-3 w-3 text-rose" />
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Last paid: {entry.lastPayment}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex flex-col items-end gap-1.5">
                <span className={`text-sm font-bold ${getDaysColor(entry.days)}`}>
                  {"₹"}{entry.amount}
                </span>
                <Badge
                  variant="outline"
                  className={`${getDaysBg(entry.days)} border text-[10px]`}
                >
                  {entry.days}d pending
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-3">
        <p className="text-center text-xs text-muted-foreground">
          {credits.length} customers with pending credit
        </p>
      </div>
    </div>
  )
}
