import { useContract, useSigner } from "wagmi";
import ensRegistryABI from "../abi/ensRegistryABI";
const useVideoLibraryContract = () => {
    try {
        const { data: signer, isError, isLoading } = useSigner()
        const videoLibraryContract = useContract({
            address: '0x0CDd1d8AaFa5e9B6ad5e5cC0E5dF25361aDa9E42',
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