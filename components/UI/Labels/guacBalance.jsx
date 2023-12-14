"use client"

import { useEffect, useState } from "react";
import { contractAdds } from "../../../utils/contractAdds"
import guacTokenabi from "../../../utils/newAbis/guacTokenabi";
import { useAccount, useContractRead } from 'wagmi'

import {ethers} from "ethers"

export default function GuacBalance(){

    const { address, isConnected,} = useAccount()

    const { data, isSuccess, refetch} = useContractRead({
        address: contractAdds.guacToken,
        abi: guacTokenabi,
        functionName: 'balanceOf',
        args: [address]
    })

    const [guac, setGuac] = useState(0);

    useEffect(()=>{
        console.log("connection: ", isConnected);

        const refetchWrapper = async () => {
            await refetch();
        }
        
        if(isConnected){
            try{
                refetchWrapper();
                setGuac(Number(ethers.utils.formatEther(data)))
            }
            catch(err) {
                console.log(err)
                console.log("Error fetching balance")
                setGuac(0);
            }
        }
    },[isConnected, isSuccess])


    // if(isConnected) 
    return(
        <div className={`block`}>
            <div className={`h-full bg-lime-300 px-3 py-1 rounded-full border-2 shadow-xl shadow-black/20 border-lime-800 flex items-center justify-center `}>
                {address && <div  className=" text-lime-900 ">{`${guac.toFixed(2)} GUAC`}</div>}
            </div>
        </div>
    )
}

