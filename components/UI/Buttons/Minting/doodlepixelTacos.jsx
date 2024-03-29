"use client"

import { ethers } from "ethers"
import Image from 'next/image'
import Swal from 'sweetalert2'
import { contractAdds } from "../../../../utils/contractAdds"
import abi from "../../../../utils/newAbis/pixelDoodleabi"

import { useState, useEffect } from 'react'


import { useGlobalContext } from "../../../../context/MainContext"

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+DOWN.png"

const error = "https://d19rxn9gjbwl25.cloudfront.net/ui/error.png"

import { useAccount } from 'wagmi'

export async function doodledPixelTacoMintSetup(address) {

    const add = contractAdds.pixelDoodle;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
        const contract = new ethers.Contract(add, abi, signer);

        return contract;
    }
    catch (err) {
        console.log("Error", err)
        Swal.fire({
            title: 'Error!',
            text: 'Couldn\'t Get Contract',
            imageUrl: error,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Taco OOPS!",
            confirmButtonText: 'Bruh 😭',
            confirmButtonColor: "#facc14", 
            customClass: {
                container: "border-8 border-black",
                popup: "bg-white rounded-2xl border-8 border-black",
                image: "-mb-5",
                confirmButton: "w-40 text-black"
            }
        })

    }

}

export default function DoodlePixelMint() {

    const { address, isConnected } = useAccount()
    const { setLoader } = useGlobalContext();
    const [supply, setSupply] = useState(0)

    async function fetchSupply(){
        try{
            const contract = await doodledPixelTacoMintSetup();

            setSupply(Number(await contract.totalSupply()));
        }
        catch(err){
            setTimeout(fetchSupply, 1000);
            console.log(err);
        }
    }

    async function mint() {
        setLoader(true);
        if (isConnected) {
            const contract = await doodledPixelTacoMintSetup(address);
            console.log("inside mint", contract);

            await contract.mint().then(
                (res) => {
                    console.log(res);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Doodled Pixel Tacos Minted',
                        icon: 'success',
                        confirmButtonText: 'LFG 🌮'
                    })
                }).catch((err) => {
                    console.log(err)
                    Swal.fire({
                        title: 'Could\'nt mint Pixel Doodle Tacos!',
                        text: 'Make sure you have enough Doodle Tacos to mint more Pixel Doodle Tacos',
                        imageUrl: error,
                        imageWidth: 200,
                        imageHeight: 200,
                        imageAlt: "Taco OOPS!",
                        confirmButtonText: 'OK!',
                        confirmButtonColor: "#facc14", 
                        customClass: {
                            container: "border-8 border-black",
                            popup: "bg-white rounded-2xl border-8 border-black",
                            image: "-mb-5",
                            confirmButton: "w-40 text-black"
                        }
                    })
                });

        }
        else {
            console.log("Not Connected")
        }
        setLoader(false);
    }

    useEffect(()=>{
        fetchSupply();

    },[])

    return (
        <>
            <button onClick={mint} className="hidden md:block absolute cursor-pointer rounded-3xl w-full h-full"></button>

            <button onClick={mint} className='md:hidden group cursor-pointer absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"} />
                <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"} />
            </button>

            <div className="bg-yellow-400 text-center translate-y-32 px-4 py-2 text-xl rounded-xl border-2 text-black border-yellow-600 w-fit flex mx-auto">
                Minted: {supply}/8226
            </div>
        </>
    )
}