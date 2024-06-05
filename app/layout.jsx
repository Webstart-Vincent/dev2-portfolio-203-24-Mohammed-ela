import { Inter } from 'next/font/google'
import Head from 'next/head'
import './globals.css'
import Provider from '@/components/provider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mohammed-Portfolio',
  description: 'Explorez le portfolio de Mohammed El Amrani, un développeur web passionné. Découvrez mes projets diversifiés, mes compétences techniques avancées et mon approche créative en développement front-end et back-end.',
  author: 'Mohammed',
  keywords: 'portfolio, développeur web, Next.js, React, Web, Node, Mailer, Project, Formation, Student, Works, Book',
  image: '/images/portfolio-preview.jpg',
  url: 'https://www.mohammed-portfolio.com',
}

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.author} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
        <meta name="robots" content="index, follow" />
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
