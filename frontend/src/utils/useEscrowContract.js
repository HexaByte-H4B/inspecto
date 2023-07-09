import { useSigner } from "wagmi";
import ensRegistry from "../abi/ensRegistry.json"
import { getContract } from "@wagmi/core";
const useEscrowContract = () => {
        const { data: signer, isError, isLoading } = useSigner()
        const useEscrowContract = getContract({
            address: '0x5a8391233E8821621986614ce1C2bcaA1dd5BF3C',
            abi: ensRegistry,
            signerOrProvider: signer,
          })
        return useEscrowContract;  
}
export default useEscrowContract;