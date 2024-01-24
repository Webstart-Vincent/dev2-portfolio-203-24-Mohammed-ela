import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '@/components/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portfolio',
  description: 'Mon portfolio de 2024'
}

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="fr-FR">
      <body className={inter.className}>
      <Provider>{children}</Provider>
      </body>
    </html>
    </>
  )
}
