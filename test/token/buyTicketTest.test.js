const { expect } = require("chai");
let tokenAddress, OracleInstance;
// let deployedOracleRinkeby = "0x2A37ab9C39F10d1fF19526BF2E0007847015D7Cc"
let deployedOracle = "0x555f287c6dd75e7f538fa432d4a633b309cc72f8"
let deployedUSDTRinkeby = "0x521855AA99a80Cb467A12b1881f05CF9440c7023"
// const constructorArguments = ["0x521855AA99a80Cb467A12b1881f05CF9440c7023","0x2A37ab9C39F10d1fF19526BF2E0007847015D7Cc"]
const constructorArguments = ["0x2A37ab9C39F10d1fF19526BF2E0007847015D7Cc"]

let deployer, taker, maker, partner;
let creator = '0x4Ba7f770DD847C0F5aD10F69fc5809F1dC915C84'  //muqeet rinkeby wallet
let buyer = '9e6cb940062343bfeb3729bb8f63a03f6beb2c37c97e3dbc85525c14c528c336'    //mutahhir rinkeby wallet
let DaoEvents, daoEventsV2;
let buyTicketStruct = ["1", 0, "Karachi"];
let createEventStruct =[false,true,true,true,"0x4Ba7f770DD847C0F5aD10F69fc5809F1dC915C84","1672466229","0","0","neww event","charity-and-causes","abcccccc location  , American Samoa", " ","QmcYtnAG8GEAtrqjG1vGZY5HQ4NXnEnx4scVsCw1CCDCH2",[false],['0'], ['30'],['0'], ['chickenFeast']]
  before(async function () {
    try {
        [deployer, taker, maker, partner] = await ethers.getSigners();
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

    //below is the mainnet forking work
    xit('it should deploy oracle', async function () {
        //pre requisit
        // 1: setup USDT and WRTH mainnet addresses
        // 2: setup oracle mainnet address
        // 3: setup hardhat config for mainnet forking
        const Oracle = await ethers.getContractFactory("Oracle");
        OracleInstance = await Oracle.deploy();
    })
    xit('it should give the 1USDT to PHNX amount', async function() {
        let PHNXPrice = await OracleInstance.fetch("0xdAC17F958D2ee523a2206206994597C13D831ec7");

        console.log("PHNXPrice");
        console.log(PHNXPrice.value.toNumber());
    })
    
});