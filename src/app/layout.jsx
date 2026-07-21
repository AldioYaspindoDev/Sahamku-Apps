import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'
import '../global.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

const monofonto = localFont({
  src: '../../monofonto/monofonto rg.otf',
  variable: '--font-monofonto',
})

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${poppins.variable} ${monofonto.variable}`}>
      <head>
        <title>Sahamku | Prediksi Harga Saham</title>
        <meta name="description" content="AI-Driven US Stock Price Predictor" />
        <link rel="icon" href="/asset/BarLogo.png" />
      </head>
      <body className="antialiased font-poppins">{children}</body>
    </html>
  )
}
