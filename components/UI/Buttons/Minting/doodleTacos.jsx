"use client"

import { ethers } from "ethers"
import Image from 'next/image'
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import { contractAdds } from "../../../../utils/contractAdds"
import abi from "../../../../utils/newAbis/doodletacosabi"

import { useGlobalContext } from "../../../../context/MainContext"

const arrowright = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/arrowright.png"


const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/buttons/Mint_Button_UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/buttons/Mint_Button_DOWN.png"

const error = "https://d19rxn9gjbwl25.cloudfront.net/ui/error.png"

import { useAccount } from 'wagmi'

export async function doodledTacoMintSetup() {

    const add = contractAdds.doodleTacos;

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

export default function DoodleMint() {

    const [amount, setAmount] = useState(1);
    const [amountBoxShow, setAmountBoxShow] = useState(false);
    const { isConnected, address } = useAccount()
    const [supply, setSupply] = useState(0)
    const { setLoader } = useGlobalContext();


    async function mint() {
        setLoader(true)
        if (isConnected) {
            const contract = await doodledTacoMintSetup(address);
            console.log("inside mint", contract);

            await contract.mint(amount, {value: ethers.utils.parseEther(String(10 * amount)) }).then(
                (res) => {
                    console.log(res);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Doodled Tacos Minted',
                        icon: 'success',
                        confirmButtonText: 'LFG 🌮'
                    })
                }).catch(
                    (err) => {
                        console.log(err)
                        Swal.fire({
                            title: 'Error!',
                            text: 'Couldn\'t Mint Doodled Tacos',
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
        setLoader(false)
    }

    async function fetchSupply(){
        try{
            const contract = await doodledTacoMintSetup();

            setSupply(Number(await contract.totalSupply()));
        }
        catch(err){
            setTimeout(fetchSupply, 1000);
            console.log(err);
        }
    }

    async function changeAmount(val){
        if(amount>=1)
        setAmount(amount+val);
        if(amount == 0 && val == 1)
        setAmount(1);
    }

    useEffect(()=>{
        fetchSupply();

    },[])

    return (
        <>
            {/* <div className=" absolute top-1/2 left-1/2 flex items-center justify-center h-full">
                <button onClick={()=>{setAmountBoxShow(true)}} className="bg-red-400">Click me pls</button>
            </div> */}
 <div className="bg-yellow-400 text-center translate-y-32 px-4 py-2 text-xl rounded-xl border-2 text-black border-yellow-600 w-fit flex mx-auto">
                Minted: {supply}/8226
            </div>

            <div className="bg-yellow-400 text-center translate-y-36 px-4 py-2 text-lg rounded-xl border-2 text-black border-yellow-600 w-fit flex mx-auto">
                Price: 10 $POL
            </div>
            <button onClick={() => { isConnected && setAmountBoxShow(true) }} className=" hidden md:block absolute cursor-pointer w-full h-[90%]"></button>

            <button onClick={() => { isConnected && setAmountBoxShow(true) }} className='md:hidden group cursor-pointer absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"} />
                <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"} />
            </button>

            {amountBoxShow &&
                <div className="bg-yellow-400 z-10 border-2 border-black rounded-2xl w-[300px] px-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-black">
                    <div className="relative flex flex-col items-center justify-center w-full h-full p-5 pt-10">
                        <h2 onClick={() => { setAmountBoxShow(false) }} className="absolute top-0 right-0 cursor-pointer m-2 mx-4 text-black hover:text-red-600 transform hover:scale-125 transition-all duration-200 ease-in-out">x</h2>
                        {/* <input placeholder="0" type="number" onKeyDown={(e) => { e.preventDefault() }} step={1} min={0} onChange={handleamountChange} value={amount} className="text-black border-2 border-black p-5 py-4 text-center text-3xl block h-fit w-full rounded-xl">
                        </input> */}
                        <div className="grid grid-flow-col grid-cols-3 items-center gap-5">
                            <button onClick={()=>{changeAmount(-1)}} className="p-3">
                                <Image width={1920} height={1080} src={arrowright} className="w-[3rem] rotate-180"/>
                            </button>
                            <div className="text-[2.5rem] text-center text-black">{amount}</div>
                            <button onClick={()=>{changeAmount(1)}} className="p-3">
                                <Image width={1920} height={1080} src={arrowright} className="w-[3rem]"/>
                            </button>
                        </div>
                        <button onClick={mint} className='mt-5 group'>
                            <Image width={80} height={80} src={claimUp} alt="home" className={"w-40 group-hover:hidden"} />
                            <Image width={80} height={80} src={claimDown} alt="home" className={"w-40 hidden group-hover:block"} />
                        </button>
                        
                    </div>
                </div>}
        </>
    )
}