// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;

  // Define event that can be subscribed to
  event NewWave(address indexed from, uint256 timestamp, string message);

  // wave metadata
  struct Wave {
    address waver;
    string message;
    uint256 timestamp;
  };

  // hold a list of waves
  Wave[] waves;
    
  constructor () {
    console.log("Let's print some money!");
  }

  function wave(string memory _message) public {
    totalWaves += 1;
    console.log("%s has waved with message %s", msg.sender, _message);

    // Append message to the declared list
    waves.push(Wave(msg.sender, _message, block.timestamp));

    // trigger a NewWave event
    emit NewWave(msg.sender, block.timestamp, _message);
  }

  // A function that returns all the waves
  function getAllWaves() public view returns (Wave[] memory) {
    return waves;
  }
  
  function getTotalWaves () public view returns (uint256) {
    console.log("We have <%d> total waves", totalWaves);
    return totalWaves;
  }
}
