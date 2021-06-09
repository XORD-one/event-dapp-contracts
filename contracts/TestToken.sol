// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.1/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract TestToken is ERC20 {
    constructor() ERC20("TEST", "TST") {}

    function faucet(address _account, uint256 _amount) public {
        console.log("send %s tokens to %s", _amount, _account);
        _mint(_account, _amount);
    }
}