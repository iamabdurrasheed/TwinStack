import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins' 
})

export const metadata: Metadata = {
  title: 'TwinStack Solutions | Two Minds. One Stack. Limitless Solutions.',
  description: 'Professional full-stack web solutions with speed, scalability, and style. MERN stack experts crafting scalable digital experiences.',
  keywords: ['web development', 'full stack', 'MERN stack', 'React', 'Next.js', 'Node.js', 'TwinStack Solutions'],
  authors: [{ name: 'TwinStack Solutions' }],
  openGraph: {
    title: 'TwinStack Solutions',
    description: 'Two Minds. One Stack. Limitless Solutions.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-inter`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
