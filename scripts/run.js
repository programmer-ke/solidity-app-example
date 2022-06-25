const main = async () => {
    // get wallet address of deployer (hardhat automatically captures it)
    // also get wallet of another random person (hardhat's environment provides this?)
    const [owner, randomPerson] = await hre.ethers.getSigners();
    // compiles contract and places it in artifacts directory
    const WaveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // Creates local ethereum network and deploys contract
    const waveContract = await WaveContractFactory.deploy();
    // await for completed deployment
    // Constract constructor runs in the process
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
    try {
	await main();
	process.exit(0);
    } catch (error) {
	console.log(error);
	process.exit(1);
    }
};

runMain();
