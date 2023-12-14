import { ethers } from "ethers";
import { contractAdds } from "../../../../utils/contractAdds";
import abi from "../../../../utils/newAbis/babyTacosabi";

import { useAccount } from 'wagmi'
import Swal from 'sweetalert2'

export async function babyTacosSetup() {
    const { address } = useAccount()

    const add = contractAdds.babyTacos;

    const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
    const signer = provider.getSigner(address);

    try {
        const contract = new ethers.Contract(add, abi, signer);

        return contract;
    }
    catch (err) {
        console.log("Error", err)
        Swal.fire({
            title: 'Error!',
            text: 'Couldn\'t fetch Baby Tacos!',
            icon: 'error',
            confirmButtonText: 'Cool!'
        })
    }

}