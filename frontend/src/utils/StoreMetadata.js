import { NFTStorage } from "nft.storage";

/// used NFT.storage to prepare the metadata for the NFT
export const StoreMetadata = async (image, Name, Description) => {
  // const nftstorage_key = process.env.NFT_STORAGE_API_KEY;

  console.log("Preparing Metadata ....");
  const nft = {
    image: image,
    name: Name,
    description: Description,
  };
  console.log("Uploading Metadata to IPFS ....");
  const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZmYTUxZjE4NTZCMGUxOTY3NTFhOTg4YkFGRTEwQzFBMjk4NmI5MEUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4ODk3NDI1NDE0NywibmFtZSI6ImF1ZGl0LXJlcG9ydCJ9.JtoMR15MM9EtGlFa_nBX7yLwep9XCTjAQwW3uz5Ip6c" });
  const metadata = await client.store(nft);
  console.log(metadata);
  console.log("NFT data stored successfully 🚀🚀");
  console.log("Metadata URI: ", metadata.url);

  return metadata;
};
