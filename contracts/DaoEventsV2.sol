// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./EventTicketV2.sol";

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.1/contracts/access/Ownable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.1/contracts/token/ERC20/IERC20.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.1/contracts/token/ERC20/utils/SafeERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract DaoEventsV2 is Ownable, EventTicketV2 {
    using SafeERC20 for IERC20;

    uint256 public eventIds;
    address tokenAddress;

    struct Event {
        bool limited;
        bool oneTimeBuy;
        address owner;
        uint256 time;
        uint256 duration;
        uint256 totalQuantity;
        uint256 quantitySold;
        string name;
        string topic;
        string location;
        string ipfsHash;
        string[] categories;
        uint256[] prices;
    }

    // Mapping from owner to list of owned events IDs.
    mapping(address => uint256[]) private ownedEvents;
    // Mapping from event ID to event revenue
    mapping(uint256 => uint256) public eventRevenue;
    // Mapping from eventId to Event struct
    mapping(uint256 => Event) public events;
    // Mapping from address to eventId to boughOrNot
    mapping(address => mapping(uint256 => bool)) ticketBought;

    event CreatedEvent(address indexed owner, uint256 eventId, Event);

    event SoldTicket(
        address indexed buyer,
        uint256 indexed eventId,
        uint256 indexed ticketId,
        string boughtLocation,
        uint256 price,
        uint256 boughtTime,
        uint256 ticketsSold,
        string category
    );

    constructor(address _token) {
        tokenAddress = _token;

        // start eventId and ticketId from 1
        eventIds++;
        ticketIds++;
    }

    modifier goodTime(uint256 _time) {
        require(_time > block.timestamp, "Invalid Timestamp.");
        _;
    }

    modifier eventExist(uint256 _id) {
        require(_id <= eventIds, "Event does not exist.");
        _;
    }

    function changeToken(address _token) public onlyOwner() {
        tokenAddress = _token;
    }

    function createEvent(Event memory _event) public goodTime(_event.time) {
        require(_event.owner == msg.sender, "Caller must be the owner");
        require(_event.quantitySold == 0, "Quantity sold must be zero");
        require(
            _event.categories.length == _event.prices.length,
            "Invalid categories or prices"
        );
        if (!_event.limited)
            require(
                _event.totalQuantity == 0,
                "quantity should be zero for unlimited tickets"
            );
        address _msgSender = msg.sender;
        uint256 _eventId = eventIds;

        // updating state
        events[_eventId] = _event;
        ownedEvents[_msgSender].push(_eventId);

        // emiting event
        emit CreatedEvent(_msgSender, _eventId, _event);

        // increment the eventId
        eventIds++;
    }

    function eventsOf(address _owner) public view returns (uint256[] memory) {
        return ownedEvents[_owner];
    }

    function getEventsCount() public view returns (uint256) {
        return eventIds;
    }

    function buyTicket(
        uint256 _eventId,
        uint256 _categoryIndex,
        string memory _boughtLocation
    ) public eventExist(_eventId) goodTime(events[_eventId].time) {
        Event memory _event = events[_eventId];
        string memory _category = _event.categories[_categoryIndex];
        uint256 _price = _event.prices[_categoryIndex];
        uint256 _ticketId = ticketIds;

        if (_event.limited)
            require(
                _event.totalQuantity > _event.quantitySold,
                "ticket quantity exceeded"
            );
        if (_event.oneTimeBuy) {
            require(
                !ticketBought[msg.sender][_eventId],
                "ticket to be bought only one time"
            );
            ticketBought[msg.sender][_eventId] = true;
        }

        // transfer the tokens to event owner
        IERC20(tokenAddress).safeTransferFrom(msg.sender, _event.owner, _price);

        eventRevenue[_eventId] = eventRevenue[_eventId] + _price;
        events[_eventId].quantitySold = events[_eventId].quantitySold + 1;

        tickets.push(
            Ticket({
                eventId: _eventId,
                seatNo: _ticketId,
                boughtLocation: _boughtLocation,
                eventLocation: _event.location
            })
        );

        // mint ticketId
        _safeMint(msg.sender, _ticketId);

        uint256 _quantitySold = events[_eventId].quantitySold;

        emit SoldTicket(
            msg.sender,
            _eventId,
            _ticketId,
            _boughtLocation,
            _price,
            block.timestamp,
            _quantitySold,
            _category
        );

        // increment ticketId
        ticketIds++;
    }
}
