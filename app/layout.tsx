import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Image to ASCII Converter',
  description: 'Next.js/TailwindCSS site that takes in an image and converts it to ASCII.',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
