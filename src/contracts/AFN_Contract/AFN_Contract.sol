// SPDX-License-Identifier: GPL-3.0
// Created by Tolulope Oshinowo
// AmericansFlagsNFT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract AmericansFlagsNFTtestv2 is ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint256 public cost;
    uint256 public maxSupply;
    uint256 public maxMintAmount;
    bool public paused;
    mapping(address => bool) public whitelisted;

    struct Flag {
        string URI;
        string starsUrl;
        string stripesUrl;
        uint256 changesLeft;
        bool isLocked;
    }

    mapping(uint256 => Flag) public flags;

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    // public
    function mint(
        address _to,
        uint256 _mintAmount,
        string memory _URI,
        string memory _starsUrl,
        string memory _stripesUrl
    ) public payable {
        uint256 supply = totalSupply();
        require(!paused);
        require(_mintAmount > 0);
        require(_mintAmount <= maxMintAmount);
        require(supply + _mintAmount <= maxSupply);

        if (msg.sender != owner()) {
            if (whitelisted[msg.sender] != true) {
                require(msg.value >= cost * _mintAmount);
            }
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            uint256 index = supply + i;
            flags[index].URI = _URI;
            flags[index].starsUrl = _starsUrl;
            flags[index].stripesUrl = _stripesUrl;
            flags[index].changesLeft = 3;
            flags[index].isLocked = false;
            _safeMint(_to, index);
        }
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return flags[_tokenId].URI;
    }

    //only owner
    function setFlagData(
        uint256 _tokenId,
        string memory _starsUrl,
        string memory _stripesUrl,
        string memory _flagURI
    ) public {
        require(
            msg.sender == ownerOf(_tokenId),
            "You are not the owner of this flag."
        );
        require(
            flags[_tokenId].changesLeft > 0,
            "You can no longer change the contents of this flag."
        );
        flags[_tokenId].URI = _flagURI;
        flags[_tokenId].starsUrl = _starsUrl;
        flags[_tokenId].stripesUrl = _stripesUrl;
        flags[_tokenId].changesLeft = flags[_tokenId].changesLeft - 1;
        if (flags[_tokenId].changesLeft == 0) {
            flags[_tokenId].isLocked = true;
        }
    }

    function setCost(uint256 _newCost) public onlyOwner {
        cost = (1 ether * _newCost) / 100;
    }

    function setMaxSupply(uint256 _newMaxSupply) public onlyOwner {
        maxSupply = _newMaxSupply;
    }

    function setMaxMintAmount(uint256 _newMaxMintAmount) public onlyOwner {
        maxMintAmount = _newMaxMintAmount;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function whitelistUser(address _user) public onlyOwner {
        whitelisted[_user] = true;
    }

    function removeWhitelistUser(address _user) public onlyOwner {
        whitelisted[_user] = false;
    }

    function withdraw() public payable onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }
}
