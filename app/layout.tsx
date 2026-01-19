import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PokeClaude - AI Plays Pokemon',
  description: 'Watch Claude AI play Pokemon Fire Red in real-time',
  icons: {
    icon: '/favicon.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-white antialiased">
        {children}
      </body>
    </html>
  )
}
