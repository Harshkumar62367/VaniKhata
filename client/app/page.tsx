import { HeaderTile } from "@/components/dashboard/header-tile"
import { StatsBar } from "@/components/dashboard/stats-bar"
import { VoiceOrderTile } from "@/components/dashboard/voice-order-tile"
import { OrderQueueTile } from "@/components/dashboard/order-queue-tile"
import { UdhaarLedgerTile } from "@/components/dashboard/udhaar-ledger-tile"
import { LocalInsightsTile } from "@/components/dashboard/local-insights-tile"
import { TranscriptTile } from "@/components/dashboard/transcript-tile"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6">
        {/* Header */}
        <HeaderTile />

        {/* Stats Bar */}
        <div className="mt-4">
          <StatsBar />
        </div>

        {/* Bento Grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Primary Action - Voice Order (Large tile) */}
          <div className="md:row-span-2">
            <div className="h-full">
              <VoiceOrderTile />
            </div>
          </div>

          {/* Order Queue */}
          <div className="md:row-span-2">
            <div className="h-full">
              <OrderQueueTile />
            </div>
          </div>

          {/* Local Insights - Top right */}
          <div className="lg:row-span-1">
            <LocalInsightsTile />
          </div>

          {/* Udhaar Ledger - Bottom right */}
          <div className="lg:row-span-1">
            <UdhaarLedgerTile />
          </div>
        </div>

        {/* Transcript View - Full width */}
        <div className="mt-4">
          <TranscriptTile />
        </div>

        {/* Footer */}
        <footer className="mt-6 border-t border-border pb-6 pt-4">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="text-xs text-muted-foreground">
              VaniKhata Merchant Dashboard v1.0
            </p>
            <p className="text-xs text-muted-foreground">
              Powering local commerce with voice AI
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
