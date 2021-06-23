// SPDX-License-Identifier: MIT
pragma solidity ^0.5.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "hardhat/console.sol";

contract TestToken is ERC20, ERC20Detailed {
    constructor() public ERC20Detailed("TEST", "TST", 18) {}

    function faucet(address _account, uint256 _amount) public {
        // console.log("send %s tokens to %s", _amount, _account);
        _mint(_account, _amount);
    }
}
