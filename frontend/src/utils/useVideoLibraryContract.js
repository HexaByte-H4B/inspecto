import { useContract, useSigner } from "wagmi";
import ensRegistryABI from "../abi/ensRegistryABI";
const useVideoLibraryContract = () => {
    try {
        const { data: signer, isError, isLoading } = useSigner()
        const videoLibraryContract = useContract({
            address: '0x7b42206074F3e04637988b9aeFF2fe19957dE6cA',
            abi: ensRegistryABI,
            signerOrProvider: signer,
          })
        return videoLibraryContract;  
    }
    catch (error) {
        console.log(error);
        return
    }
}
export default useVideoLibraryContract;