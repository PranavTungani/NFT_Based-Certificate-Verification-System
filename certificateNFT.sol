// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter = 0;

    constructor() ERC721("CertificateNFT", "CERT") Ownable(msg.sender) {}

    // Define the event
    event CertificateMinted(address indexed recipient, uint256 indexed tokenId, string metadataURI);

    // Mapping to store the issuer of each certificate
    mapping(uint256 => address) private _certificateIssuers;

    function mintCertificate(address recipient, string memory metadataURI) public onlyOwner {
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, metadataURI);

        // Store the issuer of the certificate
        _certificateIssuers[tokenId] = msg.sender;

        // Debugging: Print values
        console.log("Minted NFT to:", recipient);
        console.log("Token ID:", tokenId);
        console.log("Metadata URI:", metadataURI);
        console.log("Issuer:", msg.sender);

        emit CertificateMinted(recipient, tokenId, metadataURI);
    }

    // Function to get the issuer of a certificate
    function getCertificateIssuer(uint256 tokenId) public view returns (address) {
        require(ownerOf(tokenId) != address(0), "Certificate does not exist");
        return _certificateIssuers[tokenId];
    }

    struct Certificate {
        uint256 id;
        bool isVerified;
    }

    mapping(uint256 => Certificate) public certificates;

    // Function to verify certificate
    function verifyCertificate(uint256 certificateId) public view returns (bool) {
        require(certificates[certificateId].id != 0, "Certificate does not exist");
        return certificates[certificateId].isVerified;
    }

    function getCertificateOwner(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }
}
