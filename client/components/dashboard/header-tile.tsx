"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Store, Wifi, WifiOff } from "lucide-react"

export function HeaderTile() {
  const [isOnline, setIsOnline] = useState(true)

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 md:p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Store className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-card-foreground md:text-xl">
            VaniKhata
          </h1>
          <p className="text-xs text-muted-foreground">Kirana Merchant Dashboard</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-emerald" />
          ) : (
            <WifiOff className="h-4 w-4 text-rose" />
          )}
          <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
        <Switch
          checked={isOnline}
          onCheckedChange={setIsOnline}
          className="data-[state=checked]:bg-emerald data-[state=unchecked]:bg-rose/40"
          aria-label="Toggle store status"
        />
      </div>
    </div>
  )
}
