import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TradeFinance Academy',
  description: 'Master trade finance with interactive lessons, infographics, and quizzes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
