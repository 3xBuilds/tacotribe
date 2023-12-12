"use client"

import Image from 'next/image'
import { usePathname } from 'next/navigation'

//Wagmi
import { useAccount } from 'wagmi'

//Images
const homeBtnUp = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/homeUpLg.png'
const homeBtnDown = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/homeDownLg.png'

const pixelTacoBtnUp = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/pixelTacoUp.png'
const pixelTacoBtnDown = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/pixelTacoDown.png'

const doodledBtnUp = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/doodledUp.png'
const doodledBtnDown = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/doodledDown.png'

//Buttons
const pixelDoodBtnUp = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/pixelDoodUp.png'
const pixelDoodBtnDown = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/pixelDoodDown.png'

const stakeBtnUp = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/stakeUp.png'
const stakeBtnDown = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/stakeDown.png'

const raffleBtnUp = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/raffleUp.png'
const raffleBtnDown = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/raffleDown.png'

const minimartBtnUp = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/marketUp.png'
const minimartBtnDown = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/marketDown.png'

const backBtnUp = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/backSmallUp.png'
const backBtnDown = 'https://d19rxn9gjbwl25.cloudfront.net/buttons/backSmallDown.png'

import dynamic from 'next/dynamic'

//Button Layout
import { useState, useEffect} from 'react'
import NavButton from './UI/Buttons/navButton'
import { WalletConnectButton } from "./UI/Buttons/walletConnectButton"
import GuacBalance from "./UI/Labels/guacBalance"
// const GuacBalance = dynamic(() => import("./UI/Labels/guacBalance"), { ssr: false });

export default function Navbar() {

    const params = usePathname();

    const [openNav, setOpenNav] = useState(false);

    const { address, isConnected, isDisconnected } = useAccount();

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
      }, [])

    return (<>
        {openNav && <div className='absolute top-0 left-0 z-50 w-screen h-screen bg-yellow-400 flex flex-col gap-1 items-center justify-center'>
            <NavButton upImage={homeBtnUp} downImage={homeBtnDown} link={'https://www.nft.tacotribe.shop'} />
            <NavButton upImage={pixelTacoBtnUp} downImage={pixelTacoBtnDown} selected={params == "/pixelTaco" ? true : false} link={"/pixelTaco"} />
            <NavButton upImage={doodledBtnUp} downImage={doodledBtnDown} selected={params == "/doodled" ? true : false} link={"/doodled"} />
            <NavButton upImage={pixelDoodBtnUp} downImage={pixelDoodBtnDown} selected={params == "/pixelDood" ? true : false} link={"/pixelDood"} />
            <NavButton upImage={stakeBtnUp} downImage={stakeBtnDown} selected={params == "/stake" ? true : false} link={"/stake"} />
            <NavButton upImage={raffleBtnUp} downImage={raffleBtnDown} selected={params == "/raffle" ? true : false} link={"/raffle"} />
            <NavButton upImage={minimartBtnUp} downImage={minimartBtnDown} selected={params == "/minimart" ? true : false} link={"/minimart"} />
        </div>}

        <div suppressHydrationWarning={true} className="w-full flex items-center justify-between px-10 max-lg:px-2 absolute z-50 top-0 left-0 py-4">


            <div className='md:hidden'>
                <button onClick={() => { setOpenNav(prev => !prev) }} className='group cursor-pointer'>
                    <Image width={80} height={80} src={backBtnUp} alt="home" className={"w-10 group-hover:hidden"} />
                    <Image width={80} height={80} src={backBtnDown} alt="home" className={"w-10 hidden group-hover:block"} />
                </button>
            </div>

            <div className="w-fit max-md:hidden flex flex-row items-center justify-center gap-5 max-lg:gap-1">
                <NavButton upImage={homeBtnUp} downImage={homeBtnDown} link={'https://www.nft.tacotribe.shop'} />
                <NavButton upImage={pixelTacoBtnUp} downImage={pixelTacoBtnDown} selected={params == "/pixelTaco" ? true : false} link={"/pixelTaco"} />
                <NavButton upImage={doodledBtnUp} downImage={doodledBtnDown} selected={params == "/doodled" ? true : false} link={"/doodled"} />
                <NavButton upImage={pixelDoodBtnUp} downImage={pixelDoodBtnDown} selected={params == "/pixelDood" ? true : false} link={"/pixelDood"} />
                <NavButton upImage={stakeBtnUp} downImage={stakeBtnDown} selected={params == "/stake" ? true : false} link={"/stake"} />
                <NavButton upImage={raffleBtnUp} downImage={raffleBtnDown} selected={params == "/raffle" ? true : false} link={"/raffle"} />
                <NavButton upImage={minimartBtnUp} downImage={minimartBtnDown} selected={params == "/minimart" ? true : false} link={"/minimart"} />
            </div>
            <div suppressHydrationWarning={true} className='flex flex-row gap-2'>
                <WalletConnectButton />
                {isClient && isConnected ? <GuacBalance /> : <></>}
            </div>
        </div>
    </>
    )
}

