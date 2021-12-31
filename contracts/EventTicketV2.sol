// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "./IDaoEventsV2.sol";

contract EventTicketV2 is IDaoEventsV2, ERC721URIStorage {


    string baseURI;

    Ticket[] internal tickets;

    uint256 public ticketIds;

    // Optional mapping for token URIs
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("PhoenixDAO Ticket", "DDD") {}

    function getTicket(uint256 _id)
        public
        view
        returns (Ticket memory _ticket)
    {
        require(
            _id != 0 && _id <= tickets.length,
            "DaoEvents:getTicket: Invalid ID"
        );
        return tickets[_id - 1];
    }

    function uintToString(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function ticketsOf(address owner) external view returns (uint256[] memory) {
        uint256 _tokenCount = balanceOf(owner);

        if (_tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](_tokenCount);
            uint256 totalTickets = ticketIds;
            uint256 resultIndex = 0;

            uint256 ticketId;

            for (ticketId = 1; ticketId <= totalTickets; ticketId++) {
                if (ownerOf(ticketId) == owner) {
                    result[resultIndex] = ticketId;
                    resultIndex++;
                }
            }
            return result;
        }
    }

    //api/data
    function setBaseURI(string memory baseURI_) external { 
        baseURI = baseURI_;
    }
    
    //return base uri api/data/1
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
            require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
            
            string memory _tokenURI = _tokenURIs[tokenId];
            string memory base = _baseURI();
            
            // If there is no base URI, return the token URI.
            if (bytes(base).length == 0) {
                return _tokenURI;
            }
            // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
            if (bytes(_tokenURI).length > 0) {
                return string(abi.encodePacked(base, _tokenURI));
            }
            // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
            // return string(abi.encodePacked(base, tokenId.toString()));
            return string(abi.encodePacked(base, uintToString(tokenId)));
        }
}
