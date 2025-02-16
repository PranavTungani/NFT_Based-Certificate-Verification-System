// src/App.js

import React, { useEffect, useState } from 'react';
import { initWeb3, mintCertificate, verifyCertificate } from './web3Service';

function App() {
  const [isWeb3Initialized, setIsWeb3Initialized] = useState(false);
  const [mintStatus, setMintStatus] = useState(null);
  const [certificateStatus, setCertificateStatus] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      await initWeb3();
      setIsWeb3Initialized(true);
    };
    initializeWeb3();
  }, []);

  const handleMintCertificate = async () => {
    const recipientAddress = "RECIPIENT_ADDRESS"; // Replace with the recipient address
    const metadataURI = "METADATA_URI"; // Replace with your certificate metadata URI
    await mintCertificate(recipientAddress, metadataURI);
    setMintStatus("Certificate minted successfully.");
  };

  const handleVerifyCertificate = async (certificateId) => {
    const isVerified = await verifyCertificate(certificateId);
    setCertificateStatus(isVerified ? "Certificate is verified." : "Certificate verification failed.");
  };

  return (
    <div>
      <h1>Certificate NFT</h1>
      <button onClick={handleMintCertificate}>Mint Certificate</button>
      <p>{mintStatus}</p>

      <button onClick={() => handleVerifyCertificate(8)}>Verify Certificate (ID: 8)</button>
      <p>{certificateStatus}</p>
    </div>
  );
}

export default App;
