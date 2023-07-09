import { useContract, useSigner } from "wagmi";
import ensRegistryABI from "../abi/ensRegistryABI";
const useVideoLibraryContract = () => {
    try {
        const { data: signer, isError, isLoading } = useSigner()
        const videoLibraryContract = useContract({
            address: '0x5a8391233E8821621986614ce1C2bcaA1dd5BF3C',
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