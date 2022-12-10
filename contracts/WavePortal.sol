// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
  uint256 totalWaves;
  uint256 private randomNum;

  // Define event that can be subscribed to
  event NewWave(address indexed from, uint256 timestamp, string message);

  // wave metadata
  struct Wave {
    address waver;
    string message;
    uint256 timestamp;
  }

  // hold a list of waves
  Wave[] waves;

  // hold a mapping of addresses to timestamps
  mapping(address => uint256) public lastWavedAt;
    
  constructor () payable {
    console.log("Let's print some money!");
    // set initial seed
    randomNum = (block.difficulty + block.timestamp) % 100;
    console.log("Random seed", randomNum);
  }

  function wave(string memory _message) public {

    require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp,
	    "Wait 30sec");

    lastWavedAt[msg.sender] = block.timestamp;
    
    totalWaves += 1;
    console.log("%s has waved with message %s", msg.sender, _message);

    // Append message to the declared list
    waves.push(Wave(msg.sender, _message, block.timestamp));

    // trigger a NewWave event
    emit NewWave(msg.sender, block.timestamp, _message);

    // generate random and award if on the winning half
    randomNum = (block.difficulty + block.timestamp + randomNum) % 100;
    console.log("Random number generated", randomNum);

    if (randomNum < 50) {
      console.log("waver won!");
      uint256 prizeAmount = 0.001 ether;
      require(
	      prizeAmount <= address(this).balance,
	      "Insufficient balance in WaveContract"
	      );
      (bool success, ) = (msg.sender).call{value: prizeAmount}("");
      require(success, "Failed to send money from contract to sender");
    }
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
