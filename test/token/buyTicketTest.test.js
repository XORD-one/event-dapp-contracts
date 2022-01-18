const { expect } = require("chai");
let tokenAddress, OracleInstance;
//ethereum erc20 tokens list
let mainnetAddresses = {
    USDT:   "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    PHNX:   "0x38A2fDc11f526Ddd5a607C1F251C065f40fBF2f7",
    WETH:   "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    ORACLE: "0x555F287C6DD75e7F538Fa432D4A633B309Cc72F8",
    DAI:    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    BAT:    "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
    PILOT:  "0x37c997b35c619c21323f3518b9357914e8b99525",
    XRP:    "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
    SHIB:   "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    LINK:   "0xb0897686c545045aFc77CF20eC7A532E3120E0F1",
    GOLEM:  "0xa74476443119A942dE498590Fe1f2454d7D4aC0d",
    USDC:   "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    MATIC:  "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    LRC:    "0xbbbbca6a901c926f240b89eacb641d8aec7aeafd",
    ZRX:    "0xe41d2489571d322189246dafa5ebde1f4699f498",
    ZERO:   "0x0000000000000000000000000000000000000000",
}

// let deployedOracleRinkeby = "0x2A37ab9C39F10d1fF19526BF2E0007847015D7Cc"
let deployedOracleMainnet = "0x555f287c6dd75e7f538fa432d4a633b309cc72f8"
let deployedUSDTRinkeby = "0x521855AA99a80Cb467A12b1881f05CF9440c7023"
// const constructorArguments = ["0x521855AA99a80Cb467A12b1881f05CF9440c7023","0x2A37ab9C39F10d1fF19526BF2E0007847015D7Cc"]
const constructorArguments = ["0x2A37ab9C39F10d1fF19526BF2E0007847015D7Cc"]

let deployer, taker, maker, partner;
let creator = '0x4Ba7f770DD847C0F5aD10F69fc5809F1dC915C84'  //muqeet rinkeby wallet
let buyer = '9e6cb940062343bfeb3729bb8f63a03f6beb2c37c97e3dbc85525c14c528c336'    //mutahhir rinkeby wallet

let DaoEvents, daoEventsV2;

let buyTicketStruct = ["1", 0, "Karachi"];
const ONE_ETH = ethers.utils.parseUnits("1");

let createEventStruct =[false,true,true,true,"0x4Ba7f770DD847C0F5aD10F69fc5809F1dC915C84","1000000000000000000","0","0","neww event","charity-and-causes","abcccccc location  , American Samoa", " ","QmcYtnAG8GEAtrqjG1vGZY5HQ4NXnEnx4scVsCw1CCDCH2",[false],['0'], ['30'],['0'], ['chickenFeast']]

const printConsoles = (receipt, name) => {
    let events = receipt.events.filter((x) =>  x.event == "AssetValue")
    let desiredEvent=  events && events[2] && events[2].args
    desiredEvent && console.log(`${name} PER USDT: ${ethers.utils.formatEther(desiredEvent[0].toString())}`);
    desiredEvent && console.log(`${name} PER USDT: ${desiredEvent[0].toString()}`);

}
    before(async function () {
    try {
        [deployer, taker, maker, partner] = await ethers.getSigners();
        createEventStruct[4] = maker.address;
    } catch (error) {
        console.log("error");
        console.log(error);
    }
  });
  describe("Event's Ticket buy sell", function () {
    //it function to deploy UsdtTestnet contract
    xit("it should deploy token", async function () {
        const Token = await ethers.getContractFactory("UsdtTestnet");
        const tokenInstance = await Token.deploy();
        tokenAddress = tokenInstance.address;
        console.log("tokenAddress", tokenAddress);
    })
    
    xit("it should deploy events dapp contract", async () => {
        [deployer, taker, maker, partner] = await ethers.getSigners();
        DaoEvents = await ethers.getContractFactory("DaoEventsV2");
        daoEventsV2 = await DaoEvents.deploy(`${tokenAddress}`, ...constructorArguments);
        console.log("daoEventsV2.address");
        console.log(daoEventsV2.address);
    });
    xit("it should create event", async function () {
        createEventStruct[4] = maker.address;
        let result = await  daoEventsV2.connect(maker).createEvent(createEventStruct)
        console.log("create event response");
        // console.log(result);

        let receipt = await result.wait();
        let events = receipt.events.filter((x) =>  x.event == "CreatedEvent")
        let desiredEvent=  events && events[0].args
        console.log("desiredEvent");
        let eventObj = {
            owner: desiredEvent.owner,
            eventId: desiredEvent.eventId.toNumber(),
            ...desiredEvent
        } 
        // console.log(eventObj);
        // console.log(desiredEvent.eventId.toNumber());
    });
    //function to buyTicket
    xit("it should buy Ticket", async function () {
        let result = await daoEventsV2.connect(taker).buyTicket(buyTicketStruct);
        console.log("buy ticket response");
        console.log(result);
    });

    //below is the mainnet foAddressesrking work
    it('it should deploy oracle', async function () {
        //pre requisit
        //  1: uncomment USDT AND WETH address from Oracle.sol
        //  2: uncomment mainnet from from hardhat config
        const Oracle = await ethers.getContractFactory("Oracle");
        OracleInstance = await Oracle.deploy();
        mainnetAddresses.NEW_ORACLE = OracleInstance.address;
    })

    it('it should deploy Events Dapp mainnet', async function () {
        DaoEvents = await ethers.getContractFactory("DaoEventsV2");
        daoEventsV2 = await DaoEvents.connect(deployer).deploy(mainnetAddresses.PHNX, mainnetAddresses.NEW_ORACLE);
        console.log("daoEvents.address");
        console.log(daoEventsV2.address);
        mainnetAddresses.DAO = daoEventsV2.address;
    })
    xit('it should add token to whitelist', async function() {
        let result = await daoEventsV2.connect(deployer).addtoWhiteList(["0x0cEbA92298b655C827D224D33461B4A1F9C418a6","1","Tether"]);
        console.log("buy ticket response");
        console.log(result);
    })
    xit("it should tell if token is whitelisted or not", async function() {
        let result = await daoEventsV2.isWhiteListed("0x0cEbA92298b655C827D224D33461B4A1F9C418a6");
        console.log("isTokenWhitelisted response");
        console.log(result);
    })
    xit('it should give whitelist tokens address', async function () {
        let result = await daoEventsV2.connect(deployer).getWhiteListedTokensList();
        console.log("get whitelist response");
        console.log(result);
        console.log("-------------------");
    })


    xit('it should give the 1MATIC to USDT amount', async function() {
        let PHNXPrice = await OracleInstance.fetch(mainnetAddresses.MATIC);
        let receipt = await PHNXPrice.wait();
        printConsoles(receipt, "MATIC");
    })
    xit('it should give the 1BAT to USDT amount', async function() {
        let PHNXPrice = await OracleInstance.fetch(mainnetAddresses.BAT);
        let receipt = await PHNXPrice.wait();
        printConsoles(receipt, "BAT");
    })
    xit('it should give the 1DAI to USDT amount', async function() {
        let PHNXPrice = await OracleInstance.fetch(mainnetAddresses.DAI);
        let receipt = await PHNXPrice.wait();
        printConsoles(receipt, "DAI");
    })
    xit('it should give the 1SHIBA to USDT amount', async function() {
        let PHNXPrice = await OracleInstance.fetch(mainnetAddresses.SHIB);
        let receipt = await PHNXPrice.wait();
        printConsoles(receipt, "SHIBA");
    })
    xit('it should give the 1XRP to USDT amount', async function() {
        let PHNXPrice = await OracleInstance.fetch(mainnetAddresses.XRP);
        let receipt = await PHNXPrice.wait();
        printConsoles(receipt, "XRP");
    })
    xit('it should give the 1LINK to USDT amount', async function() {
        let PHNXPrice = await OracleInstance.fetch(mainnetAddresses.LINK);
        let receipt = await PHNXPrice.wait();
        printConsoles(receipt, "LINK");
    })
    xit('it should give the 1GOLEM to USDT amount', async function() {
        let PHNXPrice = await OracleInstance.fetch(mainnetAddresses.GOLEM);
        let receipt = await PHNXPrice.wait();
        printConsoles(receipt, "GOLEM");
    })
    xit('it should give the 1USDT to USDT amount', async function() {
        let PHNXPrice = await OracleInstance.fetch(mainnetAddresses.USDT);
        let receipt = await PHNXPrice.wait();
        printConsoles(receipt, "USDT");
    })
    xit('it should give the 1USDC to USDT amount', async function() {
        let PHNXPrice = await OracleInstance.fetch(mainnetAddresses.USDC);
        let receipt = await PHNXPrice.wait();
        printConsoles(receipt, "USDC");
    })
    xit('it should give the 1LRC to USDT amount', async function() {
        let PHNXPrice = await OracleInstance.fetch(mainnetAddresses.LRC);
        let receipt = await PHNXPrice.wait();
        printConsoles(receipt, "LRC");
    })
    xit('it should give the 1WETH to USDT amount', async function() {
        let PHNXPrice = await OracleInstance.fetch(mainnetAddresses.WETH);
        let receipt = await PHNXPrice.wait();
        printConsoles(receipt, "WETH");
    })
    xit('it should give the 1ZRX to USDT amount', async function() {
        let PHNXPrice = await OracleInstance.fetch(mainnetAddresses.ZRX);
        let receipt = await PHNXPrice.wait();
        printConsoles(receipt, "ZRX");
    })
    it('it should create Event', async function() {
        let result = await daoEventsV2.connect(maker).createEvent(createEventStruct);
        console.log("create event response");

        let receipt = await result.wait();
        let events = receipt.events.filter((x) =>  x.event == "CreatedEvent")
        let desiredEvent=  events && events[0].args
        console.log("desiredEvent");
        let eventObj = {
            owner: desiredEvent.owner,
            eventId: desiredEvent.eventId.toNumber(),
            ...desiredEvent
        } 
        console.log(eventObj);
        console.log(desiredEvent.eventId.toNumber()); 
    } )
    it('it should purchase event ticket', async function() {
        let result = await expect(daoEventsV2.connect(taker).buyTicket(buyTicketStruct, mainnetAddresses.ZERO, { value: ONE_ETH })).to.emit(daoEventsV2, "SoldTicketDetails2");
        console.log("buy ticket response");
        console.log(result);
        // use below code to see the event details
        // let receipt = await result.wait();
        // let events = receipt.events.filter((x) =>  x.event == "SoldTicketDetails2")
        // console.log(events);

    })
    xit('it should tell if token is accepted', async function() {
        let daiResult = await daoEventsV2.connect(taker).isWhiteListedToken(mainnetAddresses.DAI);
        let wethResult = await daoEventsV2.connect(taker).isWhiteListedToken(mainnetAddresses.WETH);
        console.log(daiResult, wethResult);
    })
});