const { expect } = require("chai");
const { poll } = require("ethers/lib/utils");
const { waffle,ethers } = require("hardhat");
const { userInfo } = require("os");
const provider = waffle.provider;
const web3 = require("web3");



describe('PolkalokrToken', () =>{

    const [owner, accountOne] = provider.getWallets();
    let PolkalokrV1;
    let polakalokrv1;

    beforeEach( async () =>{
        Polkalokr = await ethers.getContractFactory("PolkalokrToken");
        polakalokr = await upgrades.deployProxy(Polkalokr,[owner.address,"0xb5505a6d998549090530911180f38aC5130101c6"],{initializer: 'initialize'});
})


    it('Should mint tokens', async () =>{
        let balance = await polakalokr.totalSupply();
        console.log('total supply Before Mint ===>',balance.toString());

        console.log(await polakalokr.mint(owner.address,100000000000000));
        balance = await polakalokr.totalSupply();
        console.log('total supply  After Mint ===>',balance.toString());
    })
    it('Should only mint tokens by owner', async () =>{
        await expect( polakalokr.connect(accountOne).mint(accountOne.address,10000000)).to.be.revertedWith("minting forbidden");
    })
    it('Should burn tokens', async () =>{
        await polakalokr.mint(owner.address,100000000000000);
        let balance = await polakalokr.balanceOf(owner.address);
        console.log("Owner balance Before Burn ==>",balance.toString());
        await polakalokr.burnFrom(owner.address,10000000);
         balance = await polakalokr.balanceOf(owner.address);
        console.log("Owner balance After Burn ==>",balance.toString());
    })

    it('Should only burn tokens by owner', async () =>{
        await expect( polakalokr.connect(accountOne).burnFrom(accountOne.address,10000000)).to.be.revertedWith("burn forbidden");
    })

    it('burn should fail when not given approval', async () =>{
        await polakalokr.mint(accountOne.address,100000000000000);
        await expect( polakalokr.burnFrom(accountOne.address,10000000)).to.be.revertedWith("ERC20: burn amount exceeds allowance");
    })

    it('burn should succeed when given approval', async () =>{
        await polakalokr.mint(accountOne.address,100000000000000);
        await polakalokr.connect(accountOne).approve(owner.address,100000000000000);
        await polakalokr.burnFrom(accountOne.address,10000000);
    })
   
})