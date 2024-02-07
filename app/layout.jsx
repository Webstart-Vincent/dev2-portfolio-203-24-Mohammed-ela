import { Inter } from 'next/font/google'
import Head from 'next/head'
import './globals.css'
import Provider from '@/components/provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portfolio de Mohammed',
  description: 'Découvrez les réalisations et compétences de Mohammed, développeur web passionné en 2024.',
  author: 'Mohammed',
  keywords: 'portfolio, développeur web, Next.js, React',
  image: '/images/portfolio-preview.jpg', // Chemin vers une image de prévisualisation pour les réseaux sociaux
  url: 'https://www.mohammed-portfolio.com',
}

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.author} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <html lang="fr-FR">
        <body className={inter.className}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </>
  )
}
