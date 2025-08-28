// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract IncrediblyNeutralInvite is ERC721, OwnableUpgradeable, UUPSUpgradeable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _ipfsCIDs;

    constructor(address initialOwner) {
        _transferOwnership(initialOwner);
    }

    function mintBatch(address to, uint256 seed, uint256 count) public onlyOwner {
        for (uint256 i = 0; i < count; i++) {
            uint256 newItemId = uint256(keccak256(abi.encodePacked(seed, i, block.timestamp)));
            _mint(to, newItemId);
        }
    }

    function submitForm(uint256 tokenId, string memory ipfsCID) public {
        require(ownerOf(tokenId) == msg.sender, "You do not own this NFT");
        require(bytes(_ipfsCIDs[tokenId]).length == 0, "This NFT has already been used for a submission");
        _ipfsCIDs[tokenId] = ipfsCID;
    }

    function getIPFSCID(uint256 tokenId) public view returns (string memory) {
        return _ipfsCIDs[tokenId];
    }

    function isUsed(uint256 tokenId) public view returns (bool) {
        return bytes(_ipfsCIDs[tokenId]).length > 0;
    }
}