import { useState } from "react";
import { StoreMetadata } from "../utils/StoreMetadata";
export default function Mint() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState([]);
  const [ipfsUri, setIpfsUri] = useState("");
  const [ipfs, setIpfs] = useState("");

  const upload = async () => {
    try {
      const metadata = await StoreMetadata(img, name, description);
      const uri = metadata.url;
      setIpfs(uri);
      const url = `https://ipfs.io/ipfs/${metadata.ipnft}`;
      setIpfsUri(url);
      console.log("NFT metadata uploaded to IPFS");
      window.alert(
        "NFT metadata uploaded to ipfs , Click on IPFS link to use the data"
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <main>
        <div className={styles.form}>
          <div className={styles.firstrow}>
            <input
              className={styles.input}
              type="text"
              value={name}
              placeholder="Name of the NFT"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className={styles.secondrow}>
            <input
              className={styles.input}
              type="text"
              value={description}
              placeholder="Description for the NFT"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div className={styles.thirdrow}></div>
          <label className={styles.inputLabel}>
            <input
              className={styles.inputBox}
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
            ></input>
          </label>
          <div className={styles.buttonRow}>
            <button onClick={upload} className={styles.button}>
              Lets Go 🚀
            </button>
          </div>
          <div className={styles.secondrow}>
            {ipfsUri ? (
              <a className={styles.returnText} href={ipfsUri}>
                Ipfs Link{" "}
              </a>
            ) : (
              <a className={styles.returnText}>File is yet to upload</a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
