// SPDX-License-Identifier: MIT
pragma solidity ^0.5.17;
pragma experimental ABIEncoderV2;

interface IOracle {
    function fetch(address token) external returns (uint256 price);

    function fetchPhnxPrice() external returns (uint256 price);
}
