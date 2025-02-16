const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log(`Using account: ${deployer.address}`);

    const certificateNFT = await hre.ethers.getContractAt("CertificateNFT", "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707");

    const tokenId = 9; // Replace with actual Token ID
    console.log(`Verifying details of Token ID: ${tokenId}...`);

    const owner = await certificateNFT.ownerOf(tokenId);
    console.log(`Token ID ${tokenId} is owned by: ${owner}`);

    const issuer = await certificateNFT.certificateIssuers(tokenId);
    console.log(`Token ID ${tokenId} was issued by: ${issuer}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
