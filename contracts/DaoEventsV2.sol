// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./EventTicketV2.sol";
import "./IOracle.sol";

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract DaoEventsV2 is Ownable, EventTicketV2 {
    uint256 public eventIds;
    address public tokenAddress;
    IOracle public oracle;
    address public USDT = 0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02; // rinkeby

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
        uint256 usdtPrice,
        uint256 phnxPrice,
        uint256 boughtTime,
        uint256 ticketsSold,
        string category
    );

    constructor(address _token, address _oracle) {
        tokenAddress = _token;
        oracle = IOracle(_oracle);
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
        // increment the eventId
        eventIds++;

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
        // increment ticketId
        ticketIds++;

        address _msgSender = msg.sender;
        Event memory _event = events[_eventId];
        string memory _category = _event.categories[_categoryIndex];
        uint256 _usdtPrice = _event.prices[_categoryIndex];
        uint256 _phnxPerUsdt = oracle.fetch(USDT);
        uint256 _phnxPrice = (_usdtPrice * _phnxPerUsdt) / 1e18;
        uint256 _ticketId = ticketIds;

        if (_event.limited)
            require(
                _event.totalQuantity > _event.quantitySold,
                "ticket quantity exceeded"
            );
        if (_event.oneTimeBuy) {
            require(
                !ticketBought[_msgSender][_eventId],
                "ticket to be bought only one time"
            );
            ticketBought[_msgSender][_eventId] = true;
        }

        // transfer the tokens to event owner
        IERC20(tokenAddress).transferFrom(_msgSender, _event.owner, _phnxPrice);

        eventRevenue[_eventId] = eventRevenue[_eventId] + _phnxPrice;
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
        _safeMint(_msgSender, _ticketId);

        uint256 _quantitySold = events[_eventId].quantitySold;

        emit SoldTicket(
            _msgSender,
            _eventId,
            _ticketId,
            _boughtLocation,
            _usdtPrice,
            _phnxPrice,
            block.timestamp,
            _quantitySold,
            _category
        );
    }
}
