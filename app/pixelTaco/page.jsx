'use client'

import Image from "next/image";
import PixelMint from "../../components/UI/Buttons/Minting/pixelTacos";

import { useAccount } from 'wagmi'
import { useEffect, useState } from "react";

const bg = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/pixel_collection/taco-truck-night.jpeg";
const bgConnected = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/pixel_collection/taco-truck-day-inside-edited.jpeg";
const bgMobile = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/pixel_collection/taco-truck-night-mobile.png";
const bgMobileConnected = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/pixel_collection/taco-truck-day-inside-mobile.png";

export default function PixelTaco() {
  const { isConnected, address } = useAccount()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [isConnected])

  console.log(isConnected)
  return (
    <>
      {/* Background */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0 max-h-screen overflow-hidden">
        <div className="relative h-full">
          {!isConnected && isClient && <Image width={1920} height={1080} src={bg} className=" object-cover max-sm:hidden w-full h-full" />}
          {isConnected && isClient && <Image width={1920} height={1080} src={bgConnected} className="object-cover max-sm:hidden w-full h-full" />}
          {!isConnected && isClient && <Image width={1920} height={1080} src={bgMobile} className="object-cover sm:hidden h-full" />}
          {isConnected && isClient && <Image width={1920} height={1080} src={bgMobileConnected} className="object-cover sm:hidden h-full" />}
        </div>
      </div>

      <PixelMint />
      
    </>
  );
}
