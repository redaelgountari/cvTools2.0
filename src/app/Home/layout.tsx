// app/layout.tsx (if not already configured)

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'
import localFont from 'next/font/local'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clickexpert - Services Juridiques et Administratifs',
  description: 'Plateforme de référence au Maroc pour services juridiques et administratifs',
}

const switzer = localFont({
  src: [
    {
      path: './fonts/Switzer-Regular.otf',
      weight: '400',
      style: 'normal',
    }
   
  ],
  variable: '--font-switzer',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={switzer.className}>{children}</body>
    </html>
  )
}