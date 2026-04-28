import type { Metadata } from 'next'
import './admin/globals.css'

export const metadata: Metadata = {
  title: 'Rovic Mejia Portfolio',
  description: 'Hybrid Creative and Workforce Strategist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
