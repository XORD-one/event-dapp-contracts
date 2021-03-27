// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.5.0;

import "./EventTicket.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract DaoEvents is EventTicket, Ownable {
    using SafeMath for uint256;
    
    uint256 public _eventIds;
    uint256 public _ticketIds;
    address tokenAddress;
    
    struct Event {
        string name;
        uint time;
        uint price;
        bool token;
        bool limited;
        uint seats;
        uint sold;
        string ipfs;
        string category;
        address payable owner;
    }
    // Mapping from owner to list of owned events IDs.
    mapping(address => uint256[]) private ownedEvents;
    mapping(uint256 => uint256) public eventRevenue;
    mapping(uint256 => Event) public events;

    event CreatedEvent(uint256 eventId, string name ,uint256 time, uint256 price, bool token, bool limited, uint256 seats, uint256 sold, string ipfs, string category, address indexed owner);
    event SoldTicket(address indexed buyer, uint256 indexed eventId, uint256 ticketId);
    event UpdatedEvent(uint256 eventId,uint256 time, uint256 price, uint256 seats, string ipfs, string category);
    event NewAndUpdatedEvent(uint256 eventId, string name ,uint256 time, uint256 price, bool token, bool limited, uint256 seats, uint256 sold, string ipfs, string category, address indexed owner);
    event DeletedEvent(uint256 indexed eventId);
    
	constructor(address _token) public {
        tokenAddress = _token;
    }

    modifier goodTime(uint256 _time) {
        require(_time > block.timestamp, "Invalid Timestamp.");
        _;
    }

    modifier eventExist(uint256 _id) {
        require(_id <= _eventIds, "Event does not exist.");
        _;
    }

    function chengeToken(address _token) public onlyOwner() {
        tokenAddress = _token;
    }

    function createEvent(
        string memory _name,
        uint256 _time,
        uint256 _price,
        bool _token,
        bool _limited,
        uint256 _seats,
        string memory _ipfs,
        string memory _category
    )
        goodTime(_time)
        public
    {
        Event memory _event;
        _event.name = _name;
        _event.time = _time;
        _event.price = _price;
        _event.token = _token;
        _event.limited = _limited;
        _event.seats = _seats;
        _event.sold = 0;
        _event.ipfs = _ipfs;
        _event.category = _category;
        _event.owner = msg.sender;
        _eventIds++;
        uint256 _eventId = _eventIds;
        events[_eventId] = _event;
        ownedEvents[msg.sender].push(_eventId);
        
		emit CreatedEvent(_eventId, _event.name, _event.time, _event.price, _event.token, _event.limited, _event.seats, 0, _event.ipfs, _event.category, msg.sender);
        emit NewAndUpdatedEvent(_eventId, _event.name, _event.time, _event.price, _event.token, _event.limited, _event.seats, 0, _event.ipfs, _event.category, msg.sender);
    }

    function updateEvent(
        uint256 _eventId,
        uint256 _time,
        uint256 _price,
        bool _token,
        bool _limited,
        uint256 _seats,
        string memory _ipfs,
        string memory _category
    ) 
        goodTime(_time)
        eventExist(_eventId)
        public
    {
        require(events[_eventId].owner != address(0), "Event has deleted.");
        require(events[_eventId].owner == msg.sender, "Only Event owner can access.");
        events[_eventId].time = _time;
        events[_eventId].price = _price;
        events[_eventId].token = _token;
        events[_eventId].limited = _limited;
        events[_eventId].seats = _seats;
        events[_eventId].ipfs = _ipfs;
        events[_eventId].category = _category;
        Event memory _event = events[_eventId];
        
		emit UpdatedEvent(_eventId, _event.time, _event.price, _event.seats, _event.ipfs, _event.category);
        emit NewAndUpdatedEvent(_eventId, _event.name, _event.time, _event.price, _event.token, _event.limited, _event.seats, _event.sold, _event.ipfs, _event.category, msg.sender);
    }

    function deleteEvent(uint256 _id) public eventExist(_id) {
        require(events[_id].owner != address(0), "Event has deleted.");
        require(events[_id].owner == msg.sender, "Only Event owner can delete.");
        require(events[_id].sold == 0, "Event tickets has been sold so you cannot delete this event.");
        bool found = false;
        
		for(uint256 i = 0; i < ownedEvents[msg.sender].length; i++) {
            if(_id == ownedEvents[msg.sender][i]) {
                delete ownedEvents[msg.sender][i];
                found = true;
            }
        }
        require(found,"_id does not exist for this user");
        events[_id].name = '';
        events[_id].time = 0;
        events[_id].price = 0;
        events[_id].token = false;
        events[_id].limited = false;
        events[_id].seats = 0;
        events[_id].sold = 0;
        events[_id].ipfs = '';
        events[_id].category = '';
        events[_id].owner = address(0);
        
		emit DeletedEvent(_id);
    }

    function eventsOf(address _owner) public view returns(uint256[] memory) {
        return ownedEvents[_owner];
    }
	
    function ticketsOf(address owner) external view returns(uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        
        if (tokenCount == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](tokenCount);
            uint256 totalTickets = _ticketIds;
            uint256 resultIndex = 0;
            
            uint256 ticketId;
            
            for (ticketId = 1; ticketId <= totalTickets; ticketId++) {
                if (ownerOf(ticketId) == owner) {
                    result[resultIndex] = ticketId ;
                    resultIndex++;
                }
            }
            
            return result;
        }
    }

    function getEventsCount() public view returns(uint256) {
        return _eventIds;
    }

    function buyTicket(uint256 _eventId)
        public
        payable
        eventExist(_eventId)
        goodTime(events[_eventId].time)
    {
        Event memory _event = events[_eventId];
        if (_event.limited) require(_event.seats > _event.sold);
        if (!_event.token) {
            require(msg.value >= _event.price);
            _event.owner.transfer(_event.price);
            
        } else {
            require(IERC20(tokenAddress).transferFrom(msg.sender, _event.owner, _event.price),"");            
            eventRevenue[_eventId]= eventRevenue[_eventId].add(_event.price);
        }
        events[_eventId].sold = _event.sold.add(1);

        Ticket memory _ticket = Ticket({
            event_id: _eventId,
            seat: events[_eventId].sold 
        });
        _ticketIds++;
        uint _ticketId = _ticketIds;
        tickets.push(_ticket);
        _mint(msg.sender, _ticketId);
        
        emit SoldTicket(msg.sender, _eventId, _ticketId);   
        emitUpdatestEvent(_eventId);
    }
    
    function emitUpdatestEvent(uint256 _eventId) private{
         Event memory _event = events[_eventId];
         emit NewAndUpdatedEvent(_eventId, _event.name, _event.time, _event.price, _event.token, _event.limited, _event.seats, _event.sold, _event.ipfs, _event.category, _event.owner);
    }
}