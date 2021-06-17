// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IEventTicketV2 {
    struct Ticket {
        uint256 eventId;
        uint256 seatNo;
        string boughtLocation;
        string eventLocation;
    }
}
