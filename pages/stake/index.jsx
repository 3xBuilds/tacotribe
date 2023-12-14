"use client"

import { useState, useEffect } from "react"
import { useAccount } from 'wagmi'

import Image from "next/image";
import StakeTemplate from "../../components/UI/template/stakeTemplate"

import StakeSwitcher from "../../components/UI/Staking/stakeSwitcher"
import { useGlobalContext } from "../../context/MainContext";


const banner = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/banner.png";

const taco1 = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/StakingDappArt.png"

const stakeUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Blue+Button+Up.png"
const stakeDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Blue+Button+DOWN.png"

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+DOWN.png"

const error = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/ui/error.png"

// const switchUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/gREEN_bUTTON.png"
// const switchDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/gREEN_Button_DOWN.png"

export default function Stake() {
  const { isConnected, address } = useAccount()
  const [isClient, setIsClient] = useState(false)
  const { setLoader } = useGlobalContext();

  useEffect(() => {
    setIsClient(true)
  }, [isConnected])

  const [stakeButton, setStakeButton] = useState("Taco Tribe")

  const changeButton = (button) => {
    setStakeButton(button)
  }

  return (
    <div className="bg-white min-h-screen">

      {/* <div className="absolute top-0 left-0 w-screen h-screen z-0 ">
        <div className="relative w-full px-20 mt-20">
          <Image width={1920} height={1080} src={banner} className="object-cover h-full" />
        </div>
      </div> */}

      <div className="relative lg:w-[70%] mx-auto pt-20">
        <Image width={1920} height={1080} src={banner} className="object-cover h-full" />
      </div>

      {!isConnected && isClient && <>
        <Image src={error} width={1920} height={1080} className="w-80 mx-auto my-8"/>
        <h1 className="text-3xl text-black text-center">Seems like you are not connected.<br className=" max-lg:hidden"/><br/><span className="text-[3rem]">Please Connect Your Wallet!!!</span></h1>
      </>}

      {isConnected && isClient && <>
        <StakeSwitcher changeButton={changeButton} button={stakeButton} />

        <main className=" w-screen flex flex-col items-center justify-center">

          <StakeTemplate name={stakeButton} />

          <div className="flex flex-row gap-6 mt-8">
            {/* <button className='group cursor-pointer'>
      <Image width={80} height={80} src={stakeUp} alt="home" className={"w-40 group-hover:hidden"} />
      <Image width={80} height={80} src={stakeDown} alt="home" className={"w-40 hidden group-hover:block"} />
    </button> */}

            {/* <button className='group cursor-pointer'>
      <Image width={80} height={80} src={switchUp} alt="home" className={"w-40 group-hover:hidden"} />
      <Image width={80} height={80} src={switchDown} alt="home" className={"w-40 hidden group-hover:block"} />
    </button> */}

          </div>
        </main>
      </>}

    </div>
  );
}
