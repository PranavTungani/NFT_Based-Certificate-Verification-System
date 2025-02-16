import { ethers } from "ethers";
import contractABI from "./CertificateNFT.json"; // ABI file

const contractAddress = "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c"; // Your deployed contract address

export const getEthereumContract = () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }
  return null;
};

export const connectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected to MetaMask!");
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  } else {
    console.error("MetaMask is not installed.");
  }
};
