import type { Metadata, Viewport } from 'next'
import { Inter, Space_Mono } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space-mono' })

export const metadata: Metadata = {
  title: 'VaniKhata | Kirana Merchant Dashboard',
  description: 'Voice-powered merchant dashboard for Indian Kirana stores. Manage orders, track udhaar, and discover local trends.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0d9668',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${_inter.variable} ${_spaceMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
