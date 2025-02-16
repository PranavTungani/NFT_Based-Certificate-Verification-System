// src/web3Service.js

import { ethers } from "ethers";
import CertificateNFTABI from "./CertificateNFT.json"; // You should have your contract's ABI here

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with the address of the deployed contract

let provider;
let signer;
let certificateNFT;

const initWeb3 = async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    certificateNFT = new ethers.Contract(contractAddress, CertificateNFTABI.abi, signer);
  } else {
    alert("Ethereum provider not found. Please install MetaMask.");
  }
};

const mintCertificate = async (recipientAddress, metadataURI) => {
  try {
    await certificateNFT.mintCertificate(recipientAddress, metadataURI);
  } catch (err) {
    console.error("Error minting certificate:", err);
  }
};

const verifyCertificate = async (certificateId) => {
  try {
    const isVerified = await certificateNFT.verifyCertificate(certificateId);
    return isVerified;
  } catch (err) {
    console.error("Error verifying certificate:", err);
  }
};

export { initWeb3, mintCertificate, verifyCertificate };
