// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./IDaoEventsV2.sol";
import "./EventTicketV2.sol";
import "hardhat/console.sol";

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract DaoEventsV2 is IDaoEventsV2, Ownable, EventTicketV2, ReentrancyGuard {
    uint256 public eventIds;
    uint8 public tokensLength;  // 0 means not found
    address public tokenAddress;
    IOracle public oracle;
    address public multisigWallet = 0xFB5D2460F8701967073Ceb21fC98d891CE899902; // multisig for rinkeby & matic
    address public weth = 0xc778417E063141139Fce010982780140Aa0cD5Ab; // weth
    // address public USDT = 0x0cEbA92298b655C827D224D33461B4A1F9C418a6; // rinkeby new usdt

    // Mapping from owner to list of owned events IDs.
    mapping(address => uint256[]) private ownedEvents;
    // Mapping from event ID to event revenue
    mapping(uint256 => uint256) public eventRevenue;
    // Mapping from eventId to Event struct
    mapping(uint256 => Event) public events;
    // Mapping from tokenAddres to isAccepted
    // mapping(address => bool) public whiteListedTokens;

    // Mapping from tokenAddres to isAccepted
    mapping(uint8 => WhiteListedToken) public whiteListedTokens;

    // Mapping from address to eventId to boughOrNot
    mapping(address => mapping(uint256 => bool)) ticketBought;


    constructor(address _token, address _oracle)  {
        tokenAddress = _token;
        oracle = IOracle(_oracle);
        // addtoWhiteList(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2);  //weth mainnet

        // addtoWhiteList(0x0cEbA92298b655C827D224D33461B4A1F9C418a6); //rinkeby new usdt
        // addtoWhiteList(0xc778417E063141139Fce010982780140Aa0cD5Ab); //weth
        // addtoWhiteList(0x521855AA99a80Cb467A12b1881f05CF9440c7023); //phnx
        // addtoWhiteList(0xeb8f08a975Ab53E34D8a0330E0D34de942C95926); //usdc
        // addtoWhiteList(0x83e556Da6514325eE615FF868cd0d324856fa0Cf); //matic

        // addtoWhiteList(WhiteListedToken({tokenAddress:0x0cEbA92298b655C827D224D33461B4A1F9C418a6,chainId:1,identifier:"Tether"})); //rinkeby new usdt
        // addtoWhiteList(WhiteListedToken({tokenAddress:0xc778417E063141139Fce010982780140Aa0cD5Ab,chainId:1,identifier:"weth"})); //weth
        // addtoWhiteList(WhiteListedToken({tokenAddress:0x521855AA99a80Cb467A12b1881f05CF9440c7023,chainId:1,identifier:"phoenixdao"})); //phnx
        // addtoWhiteList(WhiteListedToken({tokenAddress:0xeb8f08a975Ab53E34D8a0330E0D34de942C95926,chainId:1,identifier:"usd-coin"})); //usdc
        
        //below are matic mainnet addresses
        addtoWhiteList(WhiteListedToken({tokenAddress:0xc2132D05D31c914a87C6611C10748AEb04B58e8F,chainId:137,identifier:"Tether"})); //usdt
        addtoWhiteList(WhiteListedToken({tokenAddress:0x92C59F1cC9A322670CCa29594e4D994d48BDFd36,chainId:137,identifier:"phoenixdao"})); //phnx
        addtoWhiteList(WhiteListedToken({tokenAddress:0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174,chainId:137,identifier:"usd-coin"})); //usdc
        addtoWhiteList(WhiteListedToken({tokenAddress:0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270,chainId:137,identifier:"wmatic"})); //wmatic
    }

    modifier goodTime(uint256 _time) {
        require(_time > block.timestamp, "Invalid Timestamp.");
        _;
    }

    modifier eventExist(uint256 _id) {
        require(_id <= eventIds, "Event does not exist.");
        _;
    }

    function getTicketLimited(uint256 _eventId)
        public
        view
        returns (bool[] memory)
    {
        return events[_eventId].ticketLimited;
    }
    
    function getTicketOwner(address _userAddress, uint _eventId)
        public
        view
        returns (bool)
    {   
        //false means ->  let him buy
        return ticketBought[_userAddress][_eventId];
    }

    function getTktQnty(uint256 _eventId)
        public
        view
        returns (uint256[] memory)
    {
        return events[_eventId].tktQnty;
    }

    function getPrices(uint256 _eventId)
        public
        view
        returns (uint256[] memory)
    {
        return events[_eventId].prices;
    }

    function getTktQntySold(uint256 _eventId)
        public
        view
        returns (uint256[] memory)
    {
        return events[_eventId].tktQntySold;
    }

    function getCategories(uint256 _eventId)
        public
        view
        returns (string[] memory)
    {
        return events[_eventId].categories;
    }

    function changeToken(address _token) public onlyOwner() {
        tokenAddress = _token;
    }
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function addtoWhiteList(WhiteListedToken memory _tokenDetails)
        public 
        onlyOwner() 
    {
        (WhiteListedToken memory tokenDetails, uint8 index) = getTokenByAddress(_tokenDetails.tokenAddress);
        if(tokenDetails.tokenAddress == address(0)) {
            tokensLength += 1;
            whiteListedTokens[tokensLength] = _tokenDetails;
        }
        else whiteListedTokens[index] = _tokenDetails;
    }
    //function to check if token is whiteListed or not 
    function isWhiteListed(address _tokenAddress) 
        internal 
        view 
        returns (bool) 
    {
        (WhiteListedToken memory tokenDetails, ) = getTokenByAddress(_tokenAddress);
        return tokenDetails.tokenAddress != address(0);
    }

    function getTokenByAddress(address _token) 
        public 
        view 
        returns (WhiteListedToken memory tokenDetails, uint8 index) 
    {
            require(_token != address(0), "Invalid token address.");
            for(uint8 i = 1; i < tokensLength + 1 ; i++) {
                if(whiteListedTokens[i].tokenAddress == _token) {
                    return (whiteListedTokens[i], i);
                }
            }
    }

    function getTokenByChainId(uint8 _chainId) 
        external 
        view 
        returns (WhiteListedToken memory tokenDetails) 
    {
            // return whiteListedTokens[_token];
            for(uint8 i = 1; i < tokensLength + 1; i++) {
                if(whiteListedTokens[i].chainId == _chainId) {
                    return whiteListedTokens[i];
                }
            }
    }

    function getWhiteListedTokensList () 
        external 
        view 
        returns (WhiteListedToken [] memory) 
    {
        WhiteListedToken [] memory _whiteListedTokensList = new WhiteListedToken[](tokensLength);
        console.log("tokensLength",tokensLength);
        //loop over whiteList and add to array
        for (uint8 i = 1; i < tokensLength + 1; i++) {
            _whiteListedTokensList[i-1] = whiteListedTokens[i];
        }
        return _whiteListedTokensList;
    }
    function updateMsgValue (uint256 phnxPrice, uint256 msgAmount) internal pure returns (uint256, uint256) {
        require(msgAmount > phnxPrice, "DaoEventsV2: Ticket price is not matching");
        // uint32 difference = uint32(msgAmount - phnxPrice);
        // phnxPrice = msgAmount - difference;
        // msgAmount -= phnxPrice;
        // return (phnxPrice, msgAmount);
        //calculate 98 percent and assign into phnxPrice and update msgAmmount
        uint256 _98percent = msgAmount * 97800000000000000000 / 100000000000000000000;
        phnxPrice = _98percent;
        msgAmount -= phnxPrice;
        return (phnxPrice, msgAmount);
    }

    function createEvent(Event memory _event) public goodTime(_event.time) {
        // increment the eventId
        eventIds++;

        require(_event.owner == _msgSender(), "Caller must be the owner");
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

        uint256 _eventId = eventIds;

        // updating state
        events[_eventId] = _event;
        ownedEvents[_msgSender()].push(_eventId);

        // emiting event
        emit CreatedEvent(_msgSender(), _eventId, _event);
    }

    function buyTicket(BuyTicket memory _buyTicket, address token)
        public
        payable
        eventExist(_buyTicket.eventId)
        goodTime(events[_buyTicket.eventId].time)
    {

        uint256 ticketCategoryIndex = _buyTicket.categoryIndex;
        uint256 _eventId = _buyTicket.eventId;
        uint256 msgAmount = msg.value;
        // string memory _boughtLocation = _buyTicket.boughtLocation;
        // increment ticketId
        ticketIds++;

        Event memory _event = events[_eventId];

        uint256 _usdtPrice;
        uint256 _phnxPrice;

        if (!_event.token) {
            // event is free
            _usdtPrice = 0;
            _phnxPrice = 0;
        } else {
            //eth payment
            if(token == address(0) && msgAmount > 0) {
                (_phnxPrice, msgAmount) = updateMsgValue(_phnxPrice, msgAmount);
            }
            //fixed crypto payment, variable dollar price, 2 means 2 phnx or 2 usdt etc
            else if(_event.isPHNX) {
                _usdtPrice = 0;
                _phnxPrice = _event.prices[_buyTicket.categoryIndex];
            }
            // fixed dollar payment, variable crypto price 
            else {
                _usdtPrice = _event.prices[_buyTicket.categoryIndex];
                _phnxPrice = (_usdtPrice * oracle.fetch(token)) / 1e18;
            }
        }

        uint256 _ticketId = ticketIds;

        if (_event.ticketLimited[ticketCategoryIndex]) {
            require(
                _event.totalQuantity > _event.totalQntySold &&
                    _event.tktQnty[ticketCategoryIndex] >
                    _event.totalQntySold,
                "ticket quantity exceeded"
            );
        }

        if (_event.oneTimeBuy) {
            require(
                !ticketBought[_msgSender()][_eventId],
                "ticket to be bought only one time"
            );
            ticketBought[_msgSender()][_eventId] = true;
        }


        _buyTicketInternal(_buyTicket, _event, _phnxPrice, _ticketId, token);
        uint percentToDeduct = 0;
        
        //payment is in other than PHNX and event is not free
        if(token != tokenAddress && _event.token) {
            percentToDeduct = (_phnxPrice * 2000000000000000000)/100000000000000000000;
            if(token == address(0) && msgAmount > 0) {
                require(msgAmount >= percentToDeduct, "DaoEventsV2: Amount to be paid is inSufficient");
                msgAmount -= percentToDeduct;
                console.log("msgAmount",msgAmount);
                console.log("percentToDeduct",percentToDeduct);
            }
            //to change -> _event.owner with multisig wallet
            sendAmount(_event.token, multisigWallet, percentToDeduct, token);
        }


        // uint256 _totalQuantitySold = events[_eventId].totalQntySold;
        uint256 _categoryTktsSold =
            events[_eventId].tktQntySold[ticketCategoryIndex];

        emit SoldTicketDetails1(
            Ticket(
                _eventId,
                _ticketId,
                _buyTicket.boughtLocation,
                _event.location
            )
        );

        emit SoldTicketDetails2(
            SoldTicketStruct(
                _event.token,
                _eventId,
                _ticketId,
                _msgSender(),
                _usdtPrice,
                _phnxPrice,
                block.timestamp,
                events[_eventId].totalQntySold,
                _categoryTktsSold,
                _event.categories[ticketCategoryIndex]
            ),
            _event.owner,
            token,
            _event.isPHNX
        );
    }

    function eventsOf(address _owner) public view returns (uint256[] memory) {
        return ownedEvents[_owner];
    }

    function getEventsCount() public view returns (uint256) {
        return eventIds;
    }

    function _buyTicketInternal(
        BuyTicket memory _buyTicket,
        Event memory _event,
        uint256 _phnxPrice,
        uint256 _ticketId,
        address token
    ) internal nonReentrant {
        eventRevenue[_buyTicket.eventId] =
            eventRevenue[_buyTicket.eventId] +
            _phnxPrice;
        events[_buyTicket.eventId].totalQntySold =
            events[_buyTicket.eventId].totalQntySold +
            1;
        events[_buyTicket.eventId].tktQntySold[_buyTicket.categoryIndex] =
            events[_buyTicket.eventId].tktQntySold[_buyTicket.categoryIndex] +
            1;

        tickets.push(
            Ticket({
                eventId: _buyTicket.eventId,
                seatNo: _ticketId,
                boughtLocation: _buyTicket.boughtLocation,
                eventLocation: _event.location
            })
        );

        // if (_event.token) {
        //     // event is paid
        //     // transfer the tokens to event owner
        //     IERC20(tokenAddress).transferFrom(
        //         _msgSender(),
        //         _event.owner,
        //         _phnxPrice
        //     );
        // }
        sendAmount(_event.token, _event.owner, _phnxPrice, token);

        // mint ticketId
        _mint(_msgSender(), _ticketId);
    }
    function sendAmount(bool isPaid, address to, uint256 amount, address _tokenAddress) private  {
        if(isPaid) {
            // event is paid
            //transfer the tokens to event owner
            if(_tokenAddress == address(0)) {
                console.log("msg.value",msg.value);
                console.log("amount",amount);
                require(msg.value >= amount, "DaoEventsV2: Amount to be paid is inSufficient");

                console.log("contract balance",address(this).balance);
                (bool sent,) = to.call{value: amount}(""); // payment in eth
                require(sent, "Failed to send Ether");
            } 
            else IERC20(_tokenAddress).transferFrom(_msgSender(), to, amount);  //payment in other than eth
        }
    }
}
