"use client"

import Image from 'next/image'

import { ethers } from "ethers"
import { contractAdds } from "../../../../utils/contractAdds"
import pixelTacosabi from "../../../../utils/newAbis/pixelTacosabi"
import Swal from 'sweetalert2'

import { useGlobalContext } from "../../../../context/MainContext"

import { useAccount } from 'wagmi'

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
    
    const {setLoader} = useGlobalContext();
    const { isConnected, address } = useAccount()
    
    async function mint() {
        setLoader(true);
        if (isConnected) {

            const contract = await pixelMintSetup(address);

            try{
                
                await contract.mint({ gasLimit: 30000 }).then((res) => { console.log(res); }).catch((err) => { console.log(err) });
            }
            catch{
                Swal.fire({
                    title: 'Error!',
                    text: 'Couldn\'t fetch Pixel Tacos',
                    icon: 'error',
                    confirmButtonText: 'Cool!'
                })
            }
        }
        else{
            console.log("Not Connected")
        }
        setLoader(false);
    }
    
    return (
        <>
            <button onClick={mint} className=" hidden md:block absolute cursor-pointer w-full h-full "></button>

            <button onClick={mint} className=' md:hidden group cursor-pointer absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"} />
                <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"} />
            </button>
        </>
    )
}