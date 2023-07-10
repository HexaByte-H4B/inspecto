import { useSigner } from "wagmi";
import ensRegistry from "../abi/ensRegistry.json"
import { getContract } from "@wagmi/core";
const useEscrowContract = () => {
        const { data: signer, isError, isLoading } = useSigner()
        const useEscrowContract = getContract({
            address: '0x0CDd1d8AaFa5e9B6ad5e5cC0E5dF25361aDa9E42',
            abi: ensRegistry,
            signerOrProvider: signer,
          })
        return useEscrowContract;  
}
export default useEscrowContract;