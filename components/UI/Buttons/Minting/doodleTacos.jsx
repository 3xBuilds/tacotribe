"use client"

import abi from "../../../../utils/newAbis/doodletacosabi"
import { contractAdds } from "../../../../utils/contractAdds"
import { ethers } from "ethers"
import { useState } from "react"
import Image from 'next/image'

const claimUp = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+UP.png"
const claimDown = "https://d19rxn9gjbwl25.cloudfront.net/projectImages/staking/Tan+Button+DOWN.png"

import { useAccount } from 'wagmi'

export async function doodledTacoMintSetup() {

    const add = contractAdds.doodleTacos;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    try {
        const contract = new ethers.Contract(add, abi, signer);

        return contract;
    }
    catch (err) {
        console.log("Error", err)
    }

}

export default function DoodleMint() {

    const [amount, setAmount] = useState(0);
    const [amountBoxShow, setAmountBoxShow] = useState(false);
    const { isConnected, address } = useAccount()


    async function mint() {
        if (isConnected) {
            const contract = await doodledTacoMintSetup();
            console.log("inside mint", contract);
            await contract.mint(amount, { gasLimit: 30000, value: ethers.utils.parseEther(String(15 * amount)) }).then((res) => { console.log(res); }).catch((err) => { console.log(err) });
        }
        else {
            console.log("Not Connected")
        }
    }

    const handleamountChange = async (e) => {

        setAmount(e.target.value);

    };

    return (
        <>
            {/* <div className=" absolute top-1/2 left-1/2 flex items-center justify-center h-full">
                <button onClick={()=>{setAmountBoxShow(true)}} className="bg-red-400">Click me pls</button>
            </div> */}

            <button onClick={() => { isConnected && setAmountBoxShow(true) }} className=" hidden xl:block absolute cursor-pointer w-full h-full"></button>

            <button onClick={mint} className='md:hidden group cursor-pointer absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
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
                        {/* <button onClick={mint} className="bg-red-400 mt-10 absolute top-1/2 left-1/2">Mint me pls</button> */}
                    </div>
                </div>}
        </>
    )
}