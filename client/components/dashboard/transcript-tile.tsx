"use client"

import { useState, useEffect } from "react"
import { Languages, Volume2, Copy, Check } from "lucide-react"

interface TranscriptLine {
  dialect: string
  translation: string
  language: string
  timestamp: string
}

const sampleTranscript: TranscriptLine[] = [
  {
    dialect: "ಅಣ್ಣ, ಎರಡು ಲೀಟರ್ ನಂದಿನಿ ಹಾಲು ಕೊಡಿ",
    translation: "Brother, give me 2 litres of Nandini milk",
    language: "Kannada",
    timestamp: "00:02",
  },
  {
    dialect: "ಒಂದು ಕೆಜಿ ಟೊಮೆಟೊ ಮತ್ತು ಈರುಳ್ಳಿ ಬೇಕು",
    translation: "Need 1 kg tomato and onion",
    language: "Kannada",
    timestamp: "00:05",
  },
  {
    dialect: "aur haan, do packet Maggi bhi daal do",
    translation: "And yes, add two packets of Maggi also",
    language: "Hindi",
    timestamp: "00:08",
  },
  {
    dialect: "ಉಧಾರ್ ಬರೆಯಿರಿ, ಶನಿವಾರ ಕೊಡ್ತೀನಿ",
    translation: "Write it on credit, I will pay on Saturday",
    language: "Kannada",
    timestamp: "00:12",
  },
]

export function TranscriptTile() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (visibleLines < sampleTranscript.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1)
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [visibleLines])

  const handleCopy = () => {
    const text = sampleTranscript
      .slice(0, visibleLines)
      .map((line) => `[${line.language}] ${line.dialect}\n→ ${line.translation}`)
      .join("\n\n")
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-card-foreground">Dialect-to-Text</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-md bg-emerald/10 px-2 py-1">
            <Volume2 className="h-3 w-3 text-emerald" />
            <span className="text-[10px] font-medium text-emerald">Live</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
            aria-label="Copy transcript"
          >
            {copied ? (
              <Check className="h-3 w-3 text-emerald" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {sampleTranscript.slice(0, visibleLines).map((line, index) => (
          <div
            key={index}
            className="rounded-lg border border-border bg-secondary/30 p-3 transition-all duration-500"
            style={{
              animation: "fadeSlideIn 0.4s ease-out forwards",
            }}
          >
            <div className="mb-1.5 flex items-center justify-between">
              <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                {line.language}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {line.timestamp}
              </span>
            </div>
            <p className="text-sm font-medium text-card-foreground">{line.dialect}</p>
            <div className="mt-1.5 flex items-start gap-1.5">
              <span className="mt-0.5 text-xs text-emerald">{"→"}</span>
              <p className="text-xs leading-relaxed text-muted-foreground">{line.translation}</p>
            </div>
          </div>
        ))}

        {visibleLines < sampleTranscript.length && (
          <div className="flex items-center gap-2 p-2">
            <div className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
            <span className="text-xs text-muted-foreground">Transcribing...</span>
          </div>
        )}

        {visibleLines === 0 && (
          <div className="flex flex-col items-center justify-center py-8">
            <Languages className="mb-2 h-8 w-8 text-muted-foreground/30" />
            <p className="text-xs text-muted-foreground">
              Start recording to see the live transcript
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
