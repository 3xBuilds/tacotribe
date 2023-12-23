"use client"

import { ethers } from "ethers"
import Image from 'next/image'
import { useState } from "react"
import { contractAdds } from "../../../../utils/contractAdds"
import abi from "../../../../utils/newAbis/tacotribeabi"

import { useAccount } from 'wagmi'
import Swal from 'sweetalert2'

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+DOWN.png"

const error = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/ui/error.png"

export async function tacoMintSetup(address) {

    const add = contractAdds.tacoTribe;

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

export default function TacoMint() {

    const [amount, setAmount] = useState(0);
    const [amountBoxShow, setAmountBoxShow] = useState(false);
    const { address } = useAccount()


    async function mint() {
        const contract = await tacoMintSetup(address);
        console.log("inside mint", contract);
        t
        await contract.mint(amount, {value: ethers.utils.parseEther(String(25 * amount)) }).then(
            (res) => {
                console.log(res);
                Swal.fire({
                    title: 'Success!',
                    text: 'Taco Tribe Minted',
                    icon: 'success',
                    confirmButtonText: 'LFG 🌮'
                }).catch(
                    (err) => {
                        console.log(err)
                        Swal.fire({
                            title: 'Error!',
                            text: 'Couldn\'t Mint Taco tribe',
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
        )

    }

    const handleamountChange = async (e) => {
        setAmount(e.target.value);
    };

    return (
        <>
            <button onClick={() => { setAmountBoxShow(true) }} className=" max-[950px]:hidden block absolute top-1/2 xl:right-[10%] right-[5%] max-[1100px]:right-0 opacity-0 cursor-pointer hover:animate-pulse hover:bg-white/20 rounded-3xl w-[25%] h-[20%]"></button>

            <button onClick={() => { setAmountBoxShow(true) }} className=' hidden max-[950px]:block group cursor-pointer absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"} />
                <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"} />
            </button>

            {amountBoxShow &&
                <div className="bg-yellow-400 z-10 border-2 border-black rounded-2xl w-[300px] px-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-black">
                    <div className="relative flex flex-col items-center justify-center w-full h-full p-5 pt-10">
                        <h2 onClick={() => { setAmountBoxShow(false) }} className="absolute top-0 right-0 cursor-pointer m-2 mx-4 text-black hover:text-red-600 transform hover:scale-125 transition-all duration-200 ease-in-out">x</h2>
                        <input placeholder="0" type="number" onKeyDown={(e) => { e.preventDefault() }} step={1} min={0} onChange={handleamountChange} value={amount} className="text-black border-2 border-black p-5 py-4 text-center text-3xl block h-fit w-full rounded-xl">
                        </input>
                        <button onClick={mint} className='mt-5 group'>
                            <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"} />
                            <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"} />
                        </button>
                    </div>
                </div>}
        </>
    )
}