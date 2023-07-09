import { useContract, useSigner } from "wagmi";
import ensRegistry from "../abi/ensRegistry.json"
const useEscrowContract = () => {
    try {
        const { data: signer, isError, isLoading } = useSigner()
        const useEscrowContract = useContract({
            address: '0x5a8391233E8821621986614ce1C2bcaA1dd5BF3C',
            abi: ensRegistry,
            signerOrProvider: signer,
          })
        return useEscrowContract;  
    }
    catch (error) {
        console.log(error);
        return
    }
}
export default useEscrowContract;