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
    uint256 private eventId;
    uint256 public eventIds;
    address public tokenAddress;
    IOracle public oracle;
    address public USDT = 0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02; // rinkeby

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
        string boughtLocation;
        string category;
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

    event SoldTicket(Ticket, SoldTicketStruct);

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
        require(_event.totalQntySold == 0, "Quantity sold must be zero");
        require(
            _event.categories.length == _event.tktQnty.length &&
                _event.categories.length == _event.prices.length &&
                _event.categories.length == _event.tktQntySold.length,
            "Invalid categories"
        );

        uint256 _totalTktQnty;
        uint256 _categoriesLength = _event.categories.length;
        for (uint256 i = 0; i < _categoriesLength; i++) {
            require(
                _event.tktQntySold[i] == 0,
                "Category quantity sold must be zero"
            );

            _totalTktQnty = _totalTktQnty + _event.tktQnty[i];

            if (!_event.ticketLimited[i]) {
                require(
                    _event.tktQnty[i] == 0,
                    "quantity should be zero for unlimited tickets"
                );
            }
        }

        require(
            _event.totalQuantity == _totalTktQnty,
            "Total ticket quantity not match category quantity"
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
        eventId = _eventId;
        // increment ticketId
        ticketIds++;

        address _msgSender = msg.sender;
        Event memory _event = events[eventId];
        string memory _category = _event.categories[_categoryIndex];
        uint256 _usdtPrice = _event.prices[_categoryIndex];
        uint256 _phnxPerUsdt = oracle.fetch(USDT);
        uint256 _phnxPrice = (_usdtPrice * _phnxPerUsdt) / 1e18;
        uint256 _ticketId = ticketIds;

        if (_event.ticketLimited[_categoryIndex]) {
            require(
                _event.totalQuantity > _event.totalQntySold &&
                    _event.tktQnty[_categoryIndex] > _event.totalQntySold,
                "ticket quantity exceeded"
            );
        }

        if (_event.oneTimeBuy) {
            require(
                !ticketBought[_msgSender][eventId],
                "ticket to be bought only one time"
            );
            ticketBought[_msgSender][eventId] = true;
        }

        // transfer the tokens to event owner
        IERC20(tokenAddress).transferFrom(_msgSender, _event.owner, _phnxPrice);

        eventRevenue[eventId] = eventRevenue[eventId] + _phnxPrice;
        events[eventId].totalQntySold = events[eventId].totalQntySold + 1;
        events[eventId].tktQntySold[_categoryIndex] =
            events[eventId].tktQntySold[_categoryIndex] +
            1;

        tickets.push(
            Ticket({
                eventId: eventId,
                seatNo: _ticketId,
                boughtLocation: _boughtLocation,
                eventLocation: _event.location
            })
        );

        // mint ticketId
        _safeMint(_msgSender, _ticketId);

        uint256 _totalQuantitySold = events[eventId].totalQntySold;
        uint256 _categoryTktsSold = events[eventId].tktQntySold[_categoryIndex];

        emit SoldTicket(
            Ticket(eventId, _ticketId, _boughtLocation, _event.location),
            SoldTicketStruct(
                _msgSender,
                _usdtPrice,
                _phnxPrice,
                block.timestamp,
                _totalQuantitySold,
                _categoryTktsSold,
                _boughtLocation,
                _category
            )
        );
    }
}
