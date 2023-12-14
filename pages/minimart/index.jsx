'use client'

import Image from "next/image";

import { useAccount } from 'wagmi'
import { useEffect, useState } from "react";

// const bg = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/marketBg.gif";
import bg from "../../assets/projectImages/taco-raffles/marketBg.gif";
const bgConnected = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/marketLive.png";
const bgMobile = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/marketBgMobile.png";
// const bgMobileConnected = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/marketLiveMobile.png";

const banner = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/taco-raffles/marketHeader-edited2.png";
const guacLogo = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Guac logo small.png";

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+DOWN.png"

import MinimartCard from "../../components/UI/Minimart/minimartCard"

export default function Minimart() {
  const { isConnected, address } = useAccount()
  const [isClient, setIsClient] = useState(false)

  const [amount, setAmount] = useState(0);
  const [showBuyDialog, setShowBuyDialog] = useState(false)

  const handleamountChange = async (e) => {
    setAmount(e.target.value);
  };

  const setDialogState = (value) => {
    setShowBuyDialog(value)
  }

  useEffect(() => {
    setIsClient(true)
  }, [isConnected])

  return (
    <>

      {/* Background */}
      <div className="fixed top-0 left-0 w-screen h-screen z-0 md:block max-sm:bg-[#bad533]">
        <div className="relative h-full">
          {!isConnected && isClient && <Image width={1920} height={1080} src={bg} className="object-cover max-sm:hidden h-full" />}
          {isConnected && isClient && <Image width={1920} height={1080} src={bgConnected} className="object-cover max-sm:hidden h-full" />}
          {!isConnected && isClient && <Image width={1920} height={1080} src={bgMobile} className="object-cover sm:hidden h-full" />}
          {/* {isConnected && isClient && <Image width={1920} height={1080} src={bgMobileConnected} className="object-cover sm:hidden h-full" />} */}
        </div>
      </div>

      {isConnected && isClient && <main className=" flex flex-col items-center gap-10 w-screen h-screen relative">
        <div className="relative w-[50%] max-md:w-[90%] pt-10 mt-16">
          <Image width={1920} height={1080} src={banner} className="object-cover h-full" />
        </div>
        <div className="text-black text-center">
          <h1 className="text-5xl">Purchase NFTs Using<span className=" inline-block ml-2 -mb-1 shadow-lg rounded-full shadow-black/50"><Image width={40} height={40} src={guacLogo}></Image></span> $Guac!</h1>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 translate-y-20">
          <MinimartCard stateChangeFunction={setDialogState} />
          <MinimartCard stateChangeFunction={setDialogState} />
          <MinimartCard stateChangeFunction={setDialogState} />
          <MinimartCard stateChangeFunction={setDialogState} />
        </div>
        <div className="text-black text-center mt-32 pb-32">
          <h1 className="text-5xl">TACO SELECTION:</h1>
        </div>
        {showBuyDialog && 
          <div className="fixed inset-0 bg-black opacity-50"></div>
        }
        {showBuyDialog &&
          <div className="bg-yellow-400 z-10 border-2 border-black rounded-2xl w-[300px] px-0 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-black">
            <div className="relative flex flex-col items-center justify-center w-full h-full p-5 pt-10">
              <h2 onClick={() => { setShowBuyDialog(false) }} className="absolute top-0 right-0 cursor-pointer m-2 mx-4 text-black hover:text-red-600 transform hover:scale-125 transition-all duration-200 ease-in-out">x</h2>
              <input placeholder="0" type="number" onKeyDown={(e) => { e.preventDefault() }} step={1} min={0} max={1} onChange={handleamountChange} value={amount} className="text-black border-2 border-black p-5 py-4 text-center text-3xl block h-fit w-full rounded-xl">
              </input>
              <button className='mt-5 group'>
                <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"} />
                <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"} />
              </button>
            </div>
          </div>
        }
      </main>
      }
    </>
  );
}
