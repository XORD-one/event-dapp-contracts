// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// contract EventTicketV2 is ERC721URIStorage {
//     struct Ticket {
//         uint256 eventId;
//         uint256 seatNo;
//         string boughtLocation;
//         string eventLocation;
//     }

//     Ticket[] internal tickets;

//     uint256 public ticketIds;

//     constructor() ERC721("PhoenixDAO Ticket", "DDD") {}

//     function getTicket(uint256 _id) public view returns (uint256, uint256) {
//         require(
//             _id != 0 && _id <= tickets.length,
//             "DaoEvents:getTicket: Invalid ID"
//         );
//         Ticket memory _ticket = tickets[_id - 1];
//         return (_ticket.eventId, _ticket.seatNo);
//     }

//     function ticketsOf(address owner) external view returns (uint256[] memory) {
//         uint256 _tokenCount = balanceOf(owner);

//         if (_tokenCount == 0) {
//             return new uint256[](0);
//         } else {
//             uint256[] memory result = new uint256[](_tokenCount);
//             uint256 totalTickets = ticketIds;
//             uint256 resultIndex = 0;

//             uint256 ticketId;

//             for (ticketId = 1; ticketId <= totalTickets; ticketId++) {
//                 if (ownerOf(ticketId) == owner) {
//                     result[resultIndex] = ticketId;
//                     resultIndex++;
//                 }
//             }

//             return result;
//         }
//     }
// }
