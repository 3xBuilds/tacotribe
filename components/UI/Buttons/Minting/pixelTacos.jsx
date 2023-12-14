"use client"

import Image from 'next/image'

import { ethers } from "ethers"
import { contractAdds } from "../../../../utils/contractAdds"
import pixelTacosabi from "../../../../utils/newAbis/pixelTacosabi"
import Swal from 'sweetalert2'

import { useGlobalContext } from "../../../../context/MainContext"

import { useAccount, useContractWrite } from 'wagmi'
import { useEffect } from 'react'

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+DOWN.png"

export async function pixelMintSetup(address) {

    const pixelAdd = contractAdds.pixelTacos;
    // console.log("Address", pixelAdd);
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");

    const signer = provider.getSigner(address);

    try {
        const contract = new ethers.Contract(pixelAdd, pixelTacosabi, signer);

        return contract;
    }
    catch (err) {
        console.log("Error", err)
        Swal.fire({
            title: 'Error!',
            text: 'Couldn\'t fetch Pixel Tacos',
            icon: 'error',
            confirmButtonText: 'Cool!'
        })
    }

}

export default function PixelMint() {

    const { setLoader } = useGlobalContext();
    const { isSuccess, isError, write } = useContractWrite({
        address: contractAdds.pixelTacos,
        abi: pixelTacosabi,
        functionName: 'mint',
    })

    useEffect(() => {
        if (isSuccess) {
            setLoader(false);
            Swal.fire({
                title: 'Success!',
                text: 'Succesfully Minted a Pixel Taco',
                icon: 'success',
                confirmButtonText: '🌮'
            })
        }
        if(isError){
            console.log("Risav is right")
            setLoader(false);
            Swal.fire({
                title: 'Error!',
                text: 'Couldn\'t fetch Pixel Tacos',
                icon: 'error',
                confirmButtonText: 'Bruh 😭'
            })
        }
    }, [isSuccess, isError])

    return (
        <>
            <button onClick={() => {
                write()
                setLoader(true)
                }} className=" hidden md:block absolute cursor-pointer w-full h-full "></button>

            <button onClick={() => {
                write()
                setLoader(true)
                }} className=' md:hidden group cursor-pointer absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"} />
                <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"} />
            </button>
        </>
    )
}