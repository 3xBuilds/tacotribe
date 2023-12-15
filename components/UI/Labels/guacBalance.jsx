"use client"

import { useEffect, useState } from "react";
import { contractAdds } from "../../../utils/contractAdds"
import guacTokenabi from "../../../utils/newAbis/guacTokenabi";
import { useAccount } from 'wagmi'

import Swal from 'sweetalert2'

import {ethers} from "ethers"

async function guacSetup(address){
    const guacAdd = contractAdds.guacToken;

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    console.log(signer)

    try{
    const contract = new ethers.Contract( guacAdd , guacTokenabi , signer );
    return contract;
}
    catch(err){
        console.log("Error",err)

        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong!',
            icon: 'error',
            confirmButtonText: 'Cool!'
        })
        
    }    
    
}

export default function GuacBalance(){

    const { address, isConnected,} = useAccount()
    const [guac, setGuac] = useState(0);

    const fetchBalance = async () => {

        try{
            const contract = await guacSetup(address);
            const balance = ethers.utils.formatEther(await contract.balanceOf(address));
            // console.log("Balance", balance)
            setGuac(Number(balance));
        }
        catch(err) {
            console.log(err)
            console.log("Error fetching balance")
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'Cool!'
            })
            setGuac(0);
        }
    }

    useEffect(()=>{
        console.log("connection: ", isConnected);
        if(isConnected){
            fetchBalance();
        }
        console.log("hiiii", typeof(guac))
    },[isConnected])


    // if(isConnected) 
    return(
        <div className={`block`}>
            <div className={`h-full bg-lime-300 px-3 py-1 rounded-full border-2 shadow-xl shadow-black/20 border-lime-800 flex items-center justify-center `}>
                {address && <div  className=" text-lime-900 ">{`${guac.toFixed(2)} GUAC`}</div>}
            </div>
        </div>
    )
}

