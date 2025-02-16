import { useState } from "react";
import { getEthereumContract } from "../utils/web3";

const MintCertificate = () => {
  const [recipient, setRecipient] = useState("");
  const [metadataURI, setMetadataURI] = useState("");

  const mintNFT = async () => {
    try {
      const contract = getEthereumContract();
      if (!contract) {
        alert("Contract not found!");
        return;
      }

      const tx = await contract.mintCertificate(recipient, metadataURI);
      await tx.wait();
      alert(`Certificate Minted Successfully!`);
    } catch (error) {
      console.error("Error minting certificate:", error);
    }
  };

  return (
    <div>
      <h2>Mint Certificate</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Metadata URI"
        value={metadataURI}
        onChange={(e) => setMetadataURI(e.target.value)}
      />
      <button onClick={mintNFT}>Mint Certificate</button>
    </div>
  );
};

export default MintCertificate;
