import { useState } from "react";
import { getEthereumContract } from "../utils/web3";

const VerifyCertificate = () => {
  const [tokenId, setTokenId] = useState("");
  const [certificateOwner, setCertificateOwner] = useState("");
  const [issuer, setIssuer] = useState("");

  const verifyNFT = async () => {
    try {
      const contract = getEthereumContract();
      if (!contract) {
        alert("Contract not found!");
        return;
      }

      const owner = await contract.getCertificateOwner(tokenId);
      const issuerAddress = await contract.getCertificateIssuer(tokenId);

      setCertificateOwner(owner);
      setIssuer(issuerAddress);
    } catch (error) {
      console.error("Error verifying certificate:", error);
    }
  };

  return (
    <div>
      <h2>Verify Certificate</h2>
      <input
        type="text"
        placeholder="Enter Token ID"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
      />
      <button onClick={verifyNFT}>Verify</button>
      {certificateOwner && <p>Owner: {certificateOwner}</p>}
      {issuer && <p>Issuer: {issuer}</p>}
    </div>
  );
};

export default VerifyCertificate;
