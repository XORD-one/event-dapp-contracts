// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IOracle.sol";
import "./IEventTicketV2.sol";

interface IDaoEventsV2 is IEventTicketV2 {
    struct Event {
        bool oneTimeBuy;
        address owner;
        uint256 time;
        uint256 duration;
        uint256 totalQuantity;
        uint256 totalQntySold;
        string name;
        string topic;
        string location;
        string ipfsHash;
        bool[] ticketLimited;
        uint256[] tktQnty;
        uint256[] prices;
        uint256[] tktQntySold;
        string[] categories;
    }

    struct SoldTicketStruct {
        address buyer;
        uint256 usdtPrice;
        uint256 phnxPrice;
        uint256 boughtTime;
        uint256 totalTktsSold;
        uint256 categoryTktsSold;
        string category;
    }

    struct BuyTicket {
        uint256 eventId;
        uint256 categoryIndex;
        string boughtLocation;
    }

    event CreatedEvent(address indexed owner, uint256 eventId, Event);

    event SoldTicketDetails2(SoldTicketStruct);

    function eventsOf(address _owner) external view returns (uint256[] memory);

    function getEventsCount() external view returns (uint256);

    function changeToken(address _token) external;

    function createEvent(Event memory _event) external;

    function buyTicket(BuyTicket memory _buyTicket) external;
}
