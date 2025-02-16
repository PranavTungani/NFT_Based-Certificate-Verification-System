async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Using account:", deployer.address);

    const certificateNFT = await ethers.getContractAt("CertificateNFT", "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707");

    console.log("Minting certificate...");

    const tx = await certificateNFT.mintCertificate(
        "0x621c46aA140564633B734c24a7D0cD05A827dF34",
        "https://ipfs.io/ipfs/bafkreicamcrf74zqotcii75zcfwaph65xvvw7agg5324qx6ynmlbyhq3wa"
    );

    const receipt = await tx.wait();
    console.log("Transaction Receipt:", receipt);

    // Extract Token ID from 'CertificateMinted' event
    const eventName = "CertificateMinted";  // The event name as defined in the smart contract
    const event = receipt.logs.find(log => {
        try {
            return certificateNFT.interface.parseLog(log).name === eventName;
        } catch (error) {
            return false; // Ignore logs that can't be parsed
        }
    });

    if (event) {
        const decodedEvent = certificateNFT.interface.parseLog(event);
        const tokenId = decodedEvent.args[1].toString(); // Token ID is the second argument
        console.log("Minted NFT Token ID:", tokenId);
    } else {
        console.log("Token ID not found in event logs.");
    }
}


main().catch((error) => {
    console.error(error);
    process.exit(1);
});