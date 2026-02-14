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
  const [transcripts, setTranscripts] = useState<TranscriptLine[]>([])
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"
        const response = await fetch(`${backendUrl}/api/orders`)
        if (response.ok) {
          const data = await response.json()
          const mapped: TranscriptLine[] = data.map((o: any) => ({
             dialect: o.raw_transcript || "Voice Audio",
             translation: o.smart_summary || "Processed Order", 
             language: o.language_detected || "Detected",
             timestamp: new Date(o.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }))
          setTranscripts(mapped)
        }
      } catch (error) {
        console.error("Failed to fetch transcripts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTranscripts()
    const interval = setInterval(fetchTranscripts, 60000) // Poll every 1 minute
    return () => clearInterval(interval)
  }, [])

  const handleCopy = () => {
    const text = transcripts
      .map((line) => `[${line.language}] ${line.dialect}\n→ ${line.translation}`)
      .join("\n\n")
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 60000)
  }

  return (
    <div className="flex flex-col h-full rounded-lg border border-border bg-card">
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

      <div className="flex flex-col gap-3 p-4 overflow-y-auto max-h-[300px]">
        {loading && transcripts.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-8">
             <p className="text-xs text-muted-foreground">Loading transcripts...</p>
           </div>
        ) : transcripts.map((line, index) => (
          <div
            key={index}
            className="rounded-lg border border-border bg-secondary/30 p-3"
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
         {transcripts.length === 0 && !loading && (
           <div className="flex flex-col items-center justify-center py-8">
             <Languages className="mb-2 h-8 w-8 text-muted-foreground/30" />
             <p className="text-xs text-muted-foreground">
               No transcripts yet
             </p>
           </div>
         )}
      </div>
    </div>
  )
}
