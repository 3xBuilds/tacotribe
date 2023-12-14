import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';

//Utils
import Providers from '../utils/Providers'

//Components
import Navbar from "./Navbar"
import Loader from "./UI/Loader/Loader"

export default function Layout({ children }) {
  return (
    <Providers>
      <Loader />
      <Navbar />
      {children}
      <SpeedInsights />
      <Analytics />
    </Providers>
  )
}
