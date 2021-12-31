const { expect } = require("chai");
//const { ethers } = require("ethers");
//const {ethers}   = require("ethers");
const web3 = require("web3");
//const inst = new Dai;
let tokenAddress, oracleAddress;
// const constructorArguments = ["0x521855AA99a80Cb467A12b1881f05CF9440c7023","0x2A37ab9C39F10d1fF19526BF2E0007847015D7Cc"]
const constructorArguments = ["0x2A37ab9C39F10d1fF19526BF2E0007847015D7Cc"]
const funds      = ['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', false, '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', false];
const limit      = web3.utils.toWei("1");

let deployer, taker, maker, partner;
let creator = '0x4Ba7f770DD847C0F5aD10F69fc5809F1dC915C84'  //muqeet wallet
let buyer = '9e6cb940062343bfeb3729bb8f63a03f6beb2c37c97e3dbc85525c14c528c336'    //mutahhir wallet
let DaoEvents, daoEventsV2;
let buyTicketStruct = ["1", 0, "Karachi"];
let createEventStruct =[false,true,true,true,"0x4Ba7f770DD847C0F5aD10F69fc5809F1dC915C84","1672466229","0","0","neww event","charity-and-causes","abcccccc location  , American Samoa", " ","QmcYtnAG8GEAtrqjG1vGZY5HQ4NXnEnx4scVsCw1CCDCH2",[false],['0'], ['30'],['0'], ['chickenFeast']]
  before(async function () {
    try {
        
        DaoEvents = await ethers.getContractFactory("DaoEventsV2");
        daoEventsV2 = await DaoEvents.deploy(...constructorArguments);
        console.log("daoEventsV2.address");
        console.log(daoEventsV2.address);
    } catch (error) {
        console.log("error");
        console.log(error);
    }
  });
  describe("Event's Ticket buy sell", function () {
    //it function to deploy UsdtTestnet contract
    it("it should deploy token", async function () {
        const Token = await ethers.getContractFactory("UsdtTestnet");
        const tokenInstance = await Token.deploy();
        tokenAddress = tokenInstance.address;
        console.log("tokenAddress", tokenAddress);
    })
    xit("it should deploy oracle", async function () {
        const Oracle = await ethers.getContractFactory("Oracle");
        const oracle = await Oracle.deploy();
        oracleAddress = oracle.address;
        const setValue = await oracle.setValues(tokenAddress);
        console.log("OracleAddress");
        console.log(oracleAddress);
        console.log(setValue);
    })
    it("it should deploy events dapp contract", async () => {
        [deployer, taker, maker, partner] = await ethers.getSigners();
        DaoEvents = await ethers.getContractFactory("DaoEventsV2");
        daoEventsV2 = await DaoEvents.deploy(`${tokenAddress}`, ...constructorArguments);
        console.log("daoEventsV2.address");
        console.log(daoEventsV2.address);
    });
    it("it should create event", async function () {
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
    it("it should buy Ticket", async function () {
        let result = await daoEventsV2.connect(taker).buyTicket(buyTicketStruct);
        console.log("buy ticket response");
        console.log(result);
    });
    
});