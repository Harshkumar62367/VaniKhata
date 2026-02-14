"use client"

import { useState } from "react"
import { Mic, MicOff, Volume2 } from "lucide-react"

export function VoiceOrderTile() {
  const [isRecording, setIsRecording] = useState(false)

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-lg border border-border bg-card p-6 md:p-8">
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />
      </div>

      <div className="relative mb-4 flex flex-col items-center">
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Tap to record customer orders in any language
        </p>
        {/* Pulse rings */}
        <div className="relative">
          {isRecording && (
            <>
              <span className="absolute inset-0 rounded-full bg-emerald/20 animate-pulse-ring" />
              <span className="absolute inset-0 rounded-full bg-emerald/20 animate-pulse-ring [animation-delay:0.5s]" />
            </>
          )}
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 md:h-24 md:w-24 ${
              isRecording
                ? "bg-emerald text-emerald-foreground shadow-lg shadow-emerald/25"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
            }`}
            aria-label={isRecording ? "Stop recording" : "Start recording voice order"}
          >
            {isRecording ? (
              <Volume2 className="h-8 w-8 animate-float md:h-10 md:w-10" />
            ) : (
              <Mic className="h-8 w-8 md:h-10 md:w-10" />
            )}
          </button>
        </div>
      </div>

      <h2 className="text-base font-semibold text-card-foreground md:text-lg">
        {isRecording ? "Listening..." : "Record Voice Order"}
      </h2>
      <p className="mt-1 text-center text-xs text-muted-foreground">
        {isRecording
          ? "Speak naturally in Kannada, Hindi, or English"
          : "Supports Kannada, Hindi, Tamil & more"}
      </p>

      {isRecording && (
        <div className="mt-4 flex items-center gap-1.5">
          {[14, 22, 18, 26, 16].map((h, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-emerald"
              style={{
                animation: `float 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                height: `${h}px`,
              }}
            />
          ))}
        </div>
      )}

      {!isRecording && (
        <div className="mt-4 flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-1.5">
          <MicOff className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Last order: 3 min ago</span>
        </div>
      )}
    </div>
  )
}
