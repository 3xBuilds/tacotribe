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

const error = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/ui/error.png"

export async function pixelMintSetup(address) {

    const pixelAdd = contractAdds.pixelTacos;
    // console.log("Address", pixelAdd);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    try {
        const contract = new ethers.Contract(pixelAdd, pixelTacosabi, signer);

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

export default function PixelMint() {

    const { setLoader } = useGlobalContext();
    const { isConnected, address } = useAccount()

    async function mint() {
        setLoader(true);
        if (isConnected) {
            const contract = await pixelMintSetup(address);

            await contract.mint().then(
                (res) => {
                    console.log(res);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Pixel Tacos Minted',
                        icon: 'success',
                        confirmButtonText: 'LFG 🌮'
                    })
                }).catch(
                    (err) => {
                        console.log(err)
                        Swal.fire({
                            title: 'Error!',
                            text: 'Couldn\'t mint Pixel Tacos',
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
                    });
        }
        else {
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