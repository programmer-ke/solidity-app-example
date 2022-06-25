// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  uint64 totalWaves;

  constructor () {
    console.log("Let's print some money!");
  }

  function wave() public {
    totalWaves += 1;
    console.log("%s has waved", msg.sender);
  }

  function getTotalWaves () public view returns (uint64) {
    console.log("We have <%d> total waves", totalWaves);
    return totalWaves;
  }
}
