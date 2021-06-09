// // SPDX-License-Identifier: UNLICENSED

// pragma solidity ^0.5.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

// contract EventTicketV1 is ERC721Full {
//     constructor() public ERC721Full("PhoenixDAO Ticket", "DDD") {}

//     struct Ticket {
//         uint256 event_id;
//         uint256 seat;
//     }

//     Ticket[] internal tickets;

//     // function ticketsOf(address _owner) public view returns(uint256) {
//     // 	return balanceOf(_owner); // only returns the count not actual token ids
//     // }

//     // function ticketsOf(address owner) external view returns(uint256[] memory) {
//     //     uint256 tokenCount = balanceOf(owner);

//     //     if (tokenCount == 0) {
//     //         return new uint256[](0);
//     //     } else {
//     //         uint256[] memory result = new uint256[](tokenCount);
//     //         uint256 totalTickets = totalSupply();
//     //         uint256 resultIndex = 0;

//     //         uint256 ticketId;

//     //         for (ticketId = 1; ticketId <= totalTickets; ticketId++) {
//     //             if (ownerOf(ticketId) == owner) {
//     //                 result[resultIndex] = ticketId ;
//     //                 resultIndex++;
//     //             }
//     //         }

//     //         return result;
//     //     }
//     // }

//     function tokenOwner(uint256 id) external view returns (address) {
//         return ownerOf(id);
//     }

//     function getTicket(uint256 _id) public view returns (uint256, uint256) {
//         require(_id != 0, "DaoEvents:getTicket: Invalid ID");
//         require(_id <= tickets.length);
//         Ticket memory _ticket = tickets[_id - 1];
//         return (_ticket.event_id, _ticket.seat);
//     }
// }
