import './globals.css'

//Fonts
import { Inter } from 'next/font/google'
import candybeans from "next/font/local"
const inter = Inter({ subsets: ['latin'] })
const font = candybeans({src:"../assets/fonts/candy-beans.otf"})

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';



//Utils
import Providers from '../utils/Providers'

//Components
import Navbar from "../components/Navbar"
import Loader from "../components/UI/Loader/Loader"

export const metadata = {
  title: 'Taco Tribe Shop',
  description: 'Taco taco moreee tacooo',
  openGraph: {
    title: 'Taco Tribe Dapp',
    description: 'Taco taco moreee tacooo',
    url: 'https://tacotribe.vercel.app',
    siteName: 'Taco Tribe Shop',
    images: [
      {
        url: 'https://d19rxn9gjbwl25.cloudfront.net/projectImages/home/background-image.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://d19rxn9gjbwl25.cloudfront.net/projectImages/home/background-image.png',
        width: 1800,
        height: 1600,
        alt: 'Taco Tribe Shop',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taco Tribe Dapp',
    description: 'aco taco moreee tacooo',
    siteId: '1467726470533754880',
    creator: '@3xbuilds',
    creatorId: '1467726470533754880',
    images: ['https://d19rxn9gjbwl25.cloudfront.net/projectImages/home/background-image.png'],
  },
  app: {
    name: 'twitter_app',
    id: {
      iphone: 'twitter_app://iphone',
      ipad: 'twitter_app://ipad',
      googleplay: 'twitter_app://googleplay',
    },
    url: {
      iphone: 'https://iphone_url',
      ipad: 'https://ipad_url',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className + " select-none "}>
      <Providers>
        <Loader/>
        <Navbar/>
        {children}
        <SpeedInsights />
        <Analytics />
      </Providers>
      </body>
    </html>
  )
}
