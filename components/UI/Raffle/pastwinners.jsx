import raffleabi from "../../../utils/newAbis/raffleabi"
import erc721abi from "../../../utils/newAbis/erc721abi"
import { contractAdds } from "../../../utils/contractAdds"
import {useState, useEffect} from "react"
import Image from "next/image"

import {ethers} from "ethers";

export default function PastWinners({num}){

    const [winnerAddress, setWinnerAddress] = useState("");
    const [nftName, setNftName] = useState("");
    const [nftImage, setNftImage] = useState("");

    async function setRaffle(){
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();

        try {
        const contract = new ethers.Contract(contractAdds.raffle, raffleabi, signer);
        // console.log("raffle", raffleAdd);
        return contract;
        }
        catch(err){
            console.log(err);
        }
    }

    async function setERC721(contractAdd){
        try{

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            if(contractAdd.toUpperCase() != "0X0000000000000000000000000000000000000000"){
              const contract = new ethers.Contract(contractAdd, erc721abi, signer);
              return contract
            }
    
          }
          catch(err){
            console.log(err);
          }
    }

    async function fetchPastWinners(){

        try{

            const contract = await setRaffle();
    
            const lastwinner = await contract?.lastWinners(num);
            console.log("LAST WINNER",lastwinner);
    
            if(lastwinner.toUpperCase() != "0X0000000000000000000000000000000000000000"){
    
                setWinnerAddress(lastwinner);
                const lastWonAddress = await contract?.lastNftWonContract(num);
                console.log("HELLO", lastWonAddress);
                const erc721contract = await setERC721(lastWonAddress);
        
                const tokenURI = await erc721contract?.tokenURI(Number(await contract?.lastNftWonTokenId(num)));
    
                if(tokenURI[0] != "h"){
                    const metadata = `https://ipfs.io/ipfs/${tokenURI.substr(7)}`;
                    const meta = await fetch(metadata);
                    const json = await meta.json();
                    const name = json["name"];
                    const image = json["image"];
                    const newimage = `https://cloudflare-ipfs.com/ipfs/${image.substr(7)}`
    
                    console.log(newimage);
            
                    setNftName(name);
                    setNftImage(newimage)
                    console.log(name, newimage);
                }
    
                else{
                    const metadata = tokenURI;
    
                    const meta = await fetch(metadata);
                    const json = await meta.json();
                    const name = json["name"];
                    const image = json["image"];
                    const newimage = `https://cloudflare-ipfs.com/ipfs/${image.substr(7)}`
    
                    console.log(newimage);
            
                    setNftName(name);
                    setNftImage(newimage)
                    console.log(name, newimage);
    
                }
            }
    
            else{
                setWinnerAddress("None")
            }
        }

        catch(err){
            setTimeout(fetchPastWinners, 1000);
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchPastWinners()
    },[])

    return(
        <>
            <div className="bg-green-400 p-3 text-center grid grid-cols-1 rounded-2xl text-white border-2 border-black">
            <div className="bg-white w-full row-span-3 h-48 border-2 border-black rounded-lg overflow-hidden">
                {nftImage != "" && <Image width={1920} height={1080} className="mx-auto h-full col-span-2 bg-white w-full border-2 object-cover" src={nftImage}/>}
            </div>
                
                <div className="col-span-1">
                    <h2 className="text-2xl mt-2">{nftName}</h2>
                    <h2 className="text-sm text-black truncate overflow-ellipsis w-full px-5">{winnerAddress}</h2>
                </div>
            </div>
        </>
    )
}