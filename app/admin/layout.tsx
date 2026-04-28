import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Rovic Mejia Portfolio',
  description: 'Manage your portfolio content',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
