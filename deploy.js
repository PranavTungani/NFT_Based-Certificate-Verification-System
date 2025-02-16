const { ethers } = require("hardhat");

async function main() {
  const CertificateNFT = await ethers.getContractFactory("CertificateNFT");
  const certificateNFT = await CertificateNFT.deploy();  // Deploy contract
  await certificateNFT.waitForDeployment();  // Wait for deployment to complete

  console.log("CertificateNFT deployed to:", await certificateNFT.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
